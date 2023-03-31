import React from "react";
import "./GlobalSequencer.css";
import { GridCell } from "../GridCell/GridCell";
import { useAppSelector } from "../../../../app/reduxHooks";
import { selectCurrentStep, selectSequencerInstruments } from "../../sequencerSelectors";
import { getInstrumentColor } from "../../instruments/getInstrumentColor";
import { SequencerInstrument } from "../../types/sequencerInstrument";

interface Props {}

/**
 * Global sequencer containing several sub sequencer instruments
 */
export const GlobalSequencer: React.FC<Props> = () => {
  const instruments: SequencerInstrument[] = useAppSelector(selectSequencerInstruments);
  const currentlyActiveStep: number = useAppSelector(selectCurrentStep);

  return (
    <div className="step-sequencer">
      {instruments.map((instrument) => (
        <div className="sequencer-instrument" key={`instrument-${instrument}`}>
          <div className="grid">
            {instrument.grid.map((track, trackIndex) => (
              <div className="track" key={`track-${trackIndex}`}>
                {track.steps.map((step, stepIndex) => (
                  <GridCell
                    key={`step-${stepIndex}`}
                    isCurrentlyActiveStep={stepIndex === currentlyActiveStep}
                    isOn={step.isOn}
                    onClick={() => {}}
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
