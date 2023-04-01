import React, { useContext, useEffect } from "react";
import "./GlobalSequencer.css";
import { GridCell } from "../GridCell/GridCell";
import { useAppDispatch, useAppSelector } from "../../../../app/reduxHooks";
import { selectCurrentStep, selectSequencerInstruments } from "../../sequencerSelectors";
import { getInstrumentColor } from "../../instruments/getInstrumentColor";
import { SequencerInstrument } from "../../types/sequencerInstrument";
import { GlobalSequencerControls } from "../GlobalSequencerControls/GlobalSequencerControls";
import SequencerContext from "../../context/sequencerContext";
import { setCurrentlyActiveStep } from "../../sequencerSlice";
import { Instrument } from "../../instruments/Instrument";
import { setInstrumentGridValue } from "../../sequencerThunks";

/**
 * Global sequencer containing several sub sequencer instruments
 */
export const GlobalSequencer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { sequencer } = useContext(SequencerContext);
  const instruments: SequencerInstrument[] = useAppSelector(selectSequencerInstruments);
  const currentlyActiveStep: number = useAppSelector(selectCurrentStep);

  // Synchronizes the currently active step from the sequencer with the redux state
  useEffect(() => {
    sequencer.onStepChanged().subscribe((currentStep) => dispatch(setCurrentlyActiveStep(currentStep)));
  }, [sequencer]);

  /**
   * Synchronizes the updated instrument tracks from the redux store with the sequencer
   */
  const synchronizeInstrumentTracks = (instrument: Instrument) => {
    const updatedInstrument = instruments.find((i) => i.id === instrument)!;
    sequencer.instruments.find((i) => i.instrument === instrument)!.setTracks(updatedInstrument.grid);
  };

  const onGridCellClicked = async (
    instrument: Instrument,
    trackIndex: number,
    stepIndex: number,
    newValue: boolean
  ) => {
    dispatch(setInstrumentGridValue({ instrument, trackIndex, stepIndex, newValue }))
      .unwrap()
      .then(() => synchronizeInstrumentTracks(instrument));
  };

  return (
    <div className="step-sequencer">
      <GlobalSequencerControls />

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
