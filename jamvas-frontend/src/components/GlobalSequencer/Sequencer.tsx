import React, { useEffect } from "react";
import "./GlobalSequencer.css";
import { GridCell } from "../GridCell/GridCell";
import { useAppDispatch, useAppSelector } from "../../store/reduxHooks";
import { selectCurrentStep, selectSequencerConfiguration } from "../../store/sequencer/sequencerSelectors";
import { getInstrumentColor } from "../../app/instruments/getInstrumentColor";
import { SequencerControls } from "../GlobalSequencerControls/SequencerControls";
import { InstrumentId } from "../../app/instruments/InstrumentId";
import { setInstrumentGridValue } from "../../store/sequencer/sequencerThunks";
import useSequence from "../../hooks/useSequence";
import { useSequencerSocket } from "../../hooks/useSequencerSocket";
import { SequencerConfiguration } from "../../types/SequencerConfiguration";
import { setSequencerConfiguration } from "../../store/sequencer/sequencerSlice";
import { updateUsersInSession } from "../../store/session/sessionSlice";
import { selectAllUsersInSession, selectUser } from "../../store/session/sessionSelectors";
import { WebsocketEvent } from "../../api/event";
import { Box } from "@chakra-ui/react";
import { Track } from "../../types/Track";
import { GiHighKick, GiPointyHat, GiPunchBlast, GiSlap, GiTopHat } from "react-icons/gi";
import { FaDrum } from "react-icons/fa";
import { rampBpmTo } from "../../utils/toneUtils";
import { testId } from "../../testing/testId";

export const Sequencer: React.FC = () => {
  const dispatch = useAppDispatch();
  const sequencerConfiguration = useAppSelector(selectSequencerConfiguration);
  const currentlyActiveStep: number = useAppSelector(selectCurrentStep);
  const self = useAppSelector(selectUser);
  const usersInSession = useAppSelector(selectAllUsersInSession);
  const { startSequence, stopSequence } = useSequence();
  const { socket, connectClient, onSequencerConfigurationUpdated, onUserJoinedSession } = useSequencerSocket();

  useEffect(() => {
    if (!socket || !self) return;

    socket.on(WebsocketEvent.CLIENT_SOCKET_CONNECTED, () => connectClient(self.id));

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
  }, [socket, self]);

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
      <Box>Playing in this session</Box>
      <Box color="var(--purple)" data-testid={testId.usersInSessionContainer}>
        {usersInSession.map((u) => u.name).join(", ")}
      </Box>
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
    </div>
  );
};
