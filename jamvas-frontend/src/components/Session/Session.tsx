import React, { useEffect } from "react";
import "./Session.css";
import { GridCell } from "../GridCell/GridCell";
import { useAppDispatch, useAppSelector } from "../../store/reduxHooks";
import { selectCurrentStep, selectSequencerConfiguration } from "../../store/sequencer/sequencerSelectors";
import { getInstrumentColor } from "../../domain/instruments/getInstrumentColor";
import { SequencerControls } from "../SequencerControls/SequencerControls";
import { InstrumentId } from "../../domain/instruments/InstrumentId";
import { setInstrumentGridValue } from "../../store/sequencer/sequencerThunks";
import useSequence from "../../hooks/useSequence";
import { useSessionSocket } from "../../hooks/useSessionSocket";
import { SequencerConfiguration } from "../../types/SequencerConfiguration";
import { setSequencerConfiguration } from "../../store/sequencer/sequencerSlice";
import { updateUsersInSession } from "../../store/session/sessionSlice";
import { selectAllUsersInSession, selectUser } from "../../store/session/sessionSelectors";
import { WebsocketEvent } from "../../api/event";
import { Box } from "@chakra-ui/react";
import { Track } from "../../types/Track";
import { GiHighKick, GiPointyHat, GiPunchBlast, GiSlap, GiTopHat } from "react-icons/gi";
import { FaDrum } from "react-icons/fa";
import { rampBpmTo } from "../../utils/audioUtils";
import { testId } from "../../testing/testId";

export const Session: React.FC = () => {
  const dispatch = useAppDispatch();
  const sequencerConfiguration = useAppSelector(selectSequencerConfiguration);
  const currentlyActiveStep: number = useAppSelector(selectCurrentStep);
  const currentUser = useAppSelector(selectUser);
  const usersInSession = useAppSelector(selectAllUsersInSession);
  const { startSequence, stopSequence } = useSequence();
  const { socket, connectClient, onSequencerConfigurationUpdated, onUserJoinedSession } = useSessionSocket();

  useEffect(() => {
    if (!socket || !currentUser) return;

    socket.on(WebsocketEvent.CLIENT_SOCKET_CONNECTED, () => connectClient(currentUser.id));

    onSequencerConfigurationUpdated((updatedConfig: SequencerConfiguration) => {
      if (updatedConfig.bpm !== sequencerConfiguration?.bpm) {
        rampBpmTo(updatedConfig.bpm);
      }
      dispatch(setSequencerConfiguration(updatedConfig));
      console.log("Received config update event", updatedConfig);
    });

    onUserJoinedSession((updatedUsers) => {
      dispatch(updateUsersInSession(updatedUsers));
      console.log("Received session users updated event", updatedUsers);
    });
  }, [socket, currentUser]);

  const onGridCellClicked = async (
    instrument: InstrumentId,
    trackIndex: number,
    stepIndex: number,
    newValue: boolean
  ) => {
    await dispatch(setInstrumentGridValue({ instrument, trackIndex, stepIndex, newValue }));
  };

  if (!sequencerConfiguration) {
    return <></>;
  }

  const renderDrumTrackIcon = (track: Track) => {
    switch (track.name) {
      case "kick":
        return <GiHighKick />;
      case "snare":
        return <GiPunchBlast />;
      case "clap":
        return <GiSlap />;
      case "hihat_open":
        return <GiPointyHat />;
      case "hihat_closed":
        return <GiTopHat />;
      default:
        return <FaDrum />;
    }
  };

  return (
    <div className="step-sequencer" data-testid={testId.sequencerContainer}>
      <SequencerControls onStartSequence={startSequence} onStopSequence={stopSequence} />

      {sequencerConfiguration.sequencerInstrumentStates.map((instrument) => (
        <div className="sequencer-instrument" key={`instrument-${instrument.instrumentId}`}>
          <div style={{ color: `${getInstrumentColor(instrument.instrumentId)}` }}>
            {instrument.instrumentDisplayName}
          </div>
          <div className="grid">
            {instrument.tracks.map((track, trackIndex) => (
              <div className="track" key={`track-${track.name}`}>
                {instrument.instrumentId === InstrumentId.DRUMS ? (
                  <Box width="25px">{renderDrumTrackIcon(track)}</Box>
                ) : (
                  <Box width="25px">{track.name.at(0)}</Box>
                )}

                {track.steps.map((step, stepIndex) => (
                  <GridCell
                    key={`track-${track.name}-step-${stepIndex}`}
                    isCurrentlyActiveStep={stepIndex === currentlyActiveStep}
                    isOn={step.isOn}
                    onClick={() => onGridCellClicked(instrument.instrumentId, trackIndex, stepIndex, !step.isOn)}
                    fillColor={getInstrumentColor(instrument.instrumentId)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
      <Box style={{ width: "100%", height: "45px" }} />
      <Box>Currently in this session</Box>
      <Box color="var(--purple)" data-testid={testId.usersInSessionContainer}>
        {usersInSession.map((u) => u.name).join(", ")}
      </Box>
    </div>
  );
};
