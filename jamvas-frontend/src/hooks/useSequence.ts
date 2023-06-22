import { useEffect, useState } from "react";
import { Sequence, Transport } from "tone";
import { TOTAL_NO_STEPS } from "../app/SequencerConstants";
import { useAppDispatch, useAppSelector } from "../store/reduxHooks";
import { setCurrentlyActiveStep } from "../store/sequencer/sequencerSlice";
import { Seconds } from "tone/build/esm/core/type/Units";
import { startSequencer, stopSequencer } from "../store/sequencer/sequencerThunks";
import { selectSequencerConfiguration } from "../store/sequencer/sequencerSelectors";
import DrumSequencer from "../app/instruments/drums/drumSequencer";
import { InstrumentId } from "../app/instruments/InstrumentId";
import LeadSynthSequencer from "../app/instruments/lead/leadSynthSequencer";

const useSequence = () => {
  const dispatch = useAppDispatch();
  const sequencerConfiguration = useAppSelector(selectSequencerConfiguration);
  const [sequence, setSequence] = useState<Sequence>();
  const [drumSequencer, setDrumSequencer] = useState<DrumSequencer>();
  const [leadSequencer, setLeadSequencer] = useState<LeadSynthSequencer>();

  useEffect(() => {
    if (!sequencerConfiguration?.sequencerInstrumentStates) return;

    setDrumSequencer(new DrumSequencer(InstrumentId.DRUMS));
    setLeadSequencer(new LeadSynthSequencer(InstrumentId.LEAD));

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
  }, [sequence, sequencerConfiguration?.sequencerInstrumentStates]);

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
