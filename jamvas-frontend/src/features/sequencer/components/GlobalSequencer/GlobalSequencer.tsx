import React from "react";
import "./GlobalSequencer.css";
import { GridCell } from "../GridCell/GridCell";
import { useAppDispatch, useAppSelector } from "../../../../app/reduxHooks";
import { selectCurrentStep, selectSequencerInstruments } from "../../sequencerSelectors";
import { getInstrumentColor } from "../../instruments/getInstrumentColor";
import { SequencerInstrument } from "../../types/sequencerInstrument";
import { GlobalSequencerControls } from "../GlobalSequencerControls/GlobalSequencerControls";
import { InstrumentId } from "../../instruments/InstrumentId";
import { setInstrumentGridValue } from "../../sequencerThunks";
import useSequence from "../../useSequence";

/**
 * Global sequencer containing several sub sequencer instruments
 */
export const GlobalSequencer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { startSequence, stopSequence } = useSequence();
  const instrumentStates: SequencerInstrument[] = useAppSelector(selectSequencerInstruments);
  const currentlyActiveStep: number = useAppSelector(selectCurrentStep);

  const onGridCellClicked = async (
    instrument: InstrumentId,
    trackIndex: number,
    stepIndex: number,
    newValue: boolean
  ) => {
    dispatch(setInstrumentGridValue({ instrument, trackIndex, stepIndex, newValue }));
  };

  return (
    <div className="step-sequencer">
      <GlobalSequencerControls onStartSequence={startSequence} onStopSequence={stopSequence} />

      {instrumentStates.map((instrument) => (
        <div className="sequencer-instrument" key={`instrument-${instrument.id}`}>
          <div style={{ color: `${getInstrumentColor(instrument.id)}` }}>{instrument.name}</div>
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
                    onClick={() => onGridCellClicked(instrument.id, trackIndex, stepIndex, !step.isOn)}
                    fillColor={getInstrumentColor(instrument.id)}
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
