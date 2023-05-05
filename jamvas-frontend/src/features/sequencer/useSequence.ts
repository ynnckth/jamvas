import { useEffect, useState } from "react";
import { Sequence, Transport } from "tone";
import { TOTAL_NO_STEPS } from "./constants";
import { useAppDispatch, useAppSelector } from "../../app/reduxHooks";
import { setCurrentlyActiveStep } from "./sequencerSlice";
import { Seconds } from "tone/build/esm/core/type/Units";
import { startSequencer, stopSequencer } from "./sequencerThunks";
import { selectSequencerInstruments } from "./sequencerSelectors";
import DrumSequencer from "./instruments/drums/drumSequencer";
import { InstrumentId } from "./instruments/InstrumentId";
import LeadSynthSequencer from "./instruments/lead/leadSynthSequencer";

const drumSequencer = new DrumSequencer(InstrumentId.DRUMS);
const leadSynthSequencer = new LeadSynthSequencer(InstrumentId.LEAD);

const useSequence = () => {
  const dispatch = useAppDispatch();
  const instrumentStates = useAppSelector(selectSequencerInstruments);
  const [sequence, setSequence] = useState<Sequence>();

  useEffect(() => {
    if (!sequence) {
      const newSequence = new Sequence(
        (time, currentStep) => {
          playAllTracksAtCurrentStep(currentStep, time);
          dispatch(setCurrentlyActiveStep(currentStep));
        },
        Array.from(Array(TOTAL_NO_STEPS).keys()),
        "16n"
      );
      setSequence(newSequence);
    } else {
      sequence.callback = (time, currentStep) => {
        playAllTracksAtCurrentStep(currentStep, time);
        dispatch(setCurrentlyActiveStep(currentStep));
      };
      setSequence(sequence);
    }
  }, [sequence, instrumentStates]);

  const playAllTracksAtCurrentStep = (currentStep: number, time: Seconds) => {
    [drumSequencer, leadSynthSequencer].forEach((instrument) => {
      const currentInstrumentState = instrumentStates.find((instrumentState) => instrumentState.id === instrument.id)!;
      currentInstrumentState.tracks.forEach((track) => {
        if (track.steps[currentStep].isOn) {
          instrument.play(track.name, time);
        }
      });
    });
  };

  const startSequence = () => {
    Transport.start();
    sequence?.start();
    dispatch(startSequencer());
    console.log("Sequence started");
  };

  const stopSequence = () => {
    Transport.stop();
    sequence?.stop();
    dispatch(stopSequencer());
    console.log("Sequence stopped");
  };

  return { startSequence, stopSequence };
};
export default useSequence;
