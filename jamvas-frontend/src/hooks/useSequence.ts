import { useEffect } from "react";
import { Sequence, Transport } from "tone";
import { TOTAL_NO_STEPS } from "../domain/SequencerConstants";
import { useAppDispatch, useAppSelector } from "../store/reduxHooks";
import { setCurrentlyActiveStep } from "../store/sequencer/sequencerSlice";
import { Seconds } from "tone/build/esm/core/type/Units";
import { startSequencer, stopSequencer } from "../store/sequencer/sequencerThunks";
import { selectSequencerConfiguration } from "../store/sequencer/sequencerSelectors";
import DrumSequencer from "../domain/instruments/drums/DrumSequencer";
import LeadSynthSequencer from "../domain/instruments/lead/LeadSynthSequencer";
import { InstrumentId } from "../domain/instruments/InstrumentId";
import { SequencerInstrumentState } from "../types/SequencerConfiguration";
import Playable from "../domain/instruments/Playable";

const sequence = new Sequence(() => {}, Array.from(Array(TOTAL_NO_STEPS).keys()), "16n");
const drumSequencer = new DrumSequencer();
const leadSequencer = new LeadSynthSequencer();

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

  const extractInstrumentState = (instrumentId: InstrumentId): SequencerInstrumentState => {
    return sequencerConfiguration!.sequencerInstrumentStates.find((i) => i.instrumentId === instrumentId)!;
  };

  const playAllActiveInstrumentTracksAtCurrentStep = (
    sequencerState: SequencerInstrumentState,
    instrument: Playable,
    currentStep: number,
    time: Seconds
  ) => {
    sequencerState.tracks.forEach((track) => {
      if (track.steps[currentStep].isOn) {
        instrument.play(track.name, time);
      }
    });
  };

  const playAllTracksAtCurrentStep = (currentStep: number, time: Seconds) => {
    if (!sequencerConfiguration) return;
    const drumSequencerState = extractInstrumentState(InstrumentId.DRUMS);
    const leadSequencerState = extractInstrumentState(InstrumentId.LEAD);

    playAllActiveInstrumentTracksAtCurrentStep(drumSequencerState, drumSequencer, currentStep, time);
    playAllActiveInstrumentTracksAtCurrentStep(leadSequencerState, leadSequencer, currentStep, time);
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
