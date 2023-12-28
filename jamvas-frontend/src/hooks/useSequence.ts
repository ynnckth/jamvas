import { useEffect } from "react";
import { Sequence, Transport } from "tone";
import { TOTAL_NO_STEPS } from "../app/SequencerConstants";
import { useAppDispatch, useAppSelector } from "../store/reduxHooks";
import { setCurrentlyActiveStep } from "../store/sequencer/sequencerSlice";
import { Seconds } from "tone/build/esm/core/type/Units";
import { startSequencer, stopSequencer } from "../store/sequencer/sequencerThunks";
import { selectSequencerConfiguration } from "../store/sequencer/sequencerSelectors";
import DrumSequencer from "../app/instruments/drums/DrumSequencer";
import { InstrumentId } from "../app/instruments/InstrumentId";
import LeadSynthSequencer from "../app/instruments/lead/LeadSynthSequencer";

const sequence = new Sequence(() => {}, Array.from(Array(TOTAL_NO_STEPS).keys()), "16n");
const drumSequencer = new DrumSequencer(InstrumentId.DRUMS);
const leadSequencer = new LeadSynthSequencer(InstrumentId.LEAD);

const useSequence = () => {
  const dispatch = useAppDispatch();
  const sequencerConfiguration = useAppSelector(selectSequencerConfiguration);

  // Update the sequence each time the sequencer state changes
  useEffect(() => {
    sequence.callback = (time, currentStep) => {
      playAllTracksAtCurrentStep(currentStep, time);
      dispatch(setCurrentlyActiveStep(currentStep));
    };
  }, [sequencerConfiguration?.sequencerInstrumentStates]);

  const playAllTracksAtCurrentStep = (currentStep: number, time: Seconds) => {
    if (!drumSequencer || !leadSequencer || !sequencerConfiguration) {
      return;
    }
    [drumSequencer, leadSequencer].forEach((instrument) => {
      const currentInstrumentState = sequencerConfiguration.sequencerInstrumentStates.find(
        (instrumentState) => instrumentState.instrumentId === instrument.id
      )!;
      currentInstrumentState.tracks.forEach((track) => {
        if (track.steps[currentStep].isOn) {
          instrument.play(track.name, time);
        }
      });
    });
  };

  const startSequence = async () => {
    Transport.start();
    sequence?.start();
    await dispatch(startSequencer());
    console.log("Sequence started");
  };

  const stopSequence = async () => {
    Transport.stop();
    sequence?.stop();
    await dispatch(stopSequencer());
    console.log("Sequence stopped");
  };

  return { startSequence, stopSequence };
};
export default useSequence;
