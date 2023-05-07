import React, { useEffect } from "react";
import "./GlobalSequencer.css";
import { GridCell } from "../GridCell/GridCell";
import { useAppDispatch, useAppSelector } from "../../../../app/reduxHooks";
import { selectCurrentStep, selectSequencerConfiguration } from "../../sequencerSelectors";
import { getInstrumentColor } from "../../instruments/getInstrumentColor";
import { SequencerControls } from "../GlobalSequencerControls/SequencerControls";
import { InstrumentId } from "../../instruments/InstrumentId";
import { getSequencerConfiguration, setInstrumentGridValue } from "../../sequencerThunks";
import useSequence from "../../useSequence";

export const Sequencer: React.FC = () => {
  const dispatch = useAppDispatch();
  const sequencerConfiguration = useAppSelector(selectSequencerConfiguration);
  const currentlyActiveStep: number = useAppSelector(selectCurrentStep);
  const { startSequence, stopSequence } = useSequence();

  useEffect(() => {
    dispatch(getSequencerConfiguration());
  }, []);

  const onGridCellClicked = async (
    instrument: InstrumentId,
    trackIndex: number,
    stepIndex: number,
    newValue: boolean
  ) => {
    dispatch(setInstrumentGridValue({ instrument, trackIndex, stepIndex, newValue }));
  };

  if (!sequencerConfiguration) {
    return <></>;
  }

  return (
    <div className="step-sequencer">
      <SequencerControls onStartSequence={startSequence} onStopSequence={stopSequence} />

      {sequencerConfiguration.sequencerInstrumentStates.map((instrument) => (
        <div className="sequencer-instrument" key={`instrument-${instrument.instrumentId}`}>
          <div style={{ color: `${getInstrumentColor(instrument.instrumentId)}` }}>
            {instrument.instrumentDisplayName}
          </div>
          <div className="grid">
            {instrument.tracks.map((track, trackIndex) => (
              <div className="track" key={`track-${trackIndex}`}>
                {/* TODO: add track icon logo */}
                <div>{track.name.at(0)}</div>
                {track.steps.map((step, stepIndex) => (
                  <GridCell
                    key={`step-${stepIndex}`}
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