import "./SequencerControls.css";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/reduxHooks";
import { selectIsSequencerStopped, selectSequencerConfiguration } from "../../store/sequencer/sequencerSelectors";
import { setBpm } from "../../store/sequencer/sequencerThunks";
import { FaPause, FaPlay } from "react-icons/fa";
import { DEFAULT_BPM, MAX_BPM, MIN_BPM } from "../../domain/SequencerConstants";
import { debounce } from "lodash";
import { Box, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from "@chakra-ui/react";

interface Props {
  onStartSequence: () => Promise<void>;
  onStopSequence: () => Promise<void>;
}

export const SequencerControls: React.FC<Props> = ({ onStartSequence, onStopSequence }) => {
  const dispatch = useAppDispatch();
  const isSequencerStopped = useAppSelector(selectIsSequencerStopped);
  const sequencerConfiguration = useAppSelector(selectSequencerConfiguration);

  const onKeyPressed = async (event: KeyboardEvent) => {
    if (event.code === "Space") {
      await toggleStopped();
      event.preventDefault();
    }
  };

  const onUpdateBpm = (newBpm: number) => dispatch(setBpm({ newBpm: newBpm }));

  const toggleStopped = async () => (isSequencerStopped ? await onStartSequence() : await onStopSequence());

  useEffect(() => {
    document.addEventListener("keypress", onKeyPressed);
    return () => document.removeEventListener("keypress", onKeyPressed);
  });

  return (
    <div className="sequencer-controls">
      <div className="play-stop-button" onClick={() => toggleStopped()} data-test-id="play-stop-button">
        {isSequencerStopped ? <FaPlay size={20} /> : <FaPause size={20} />}
      </div>
      <Box marginRight="15px">{sequencerConfiguration?.bpm}</Box>
      <Box display="flex" alignItems="center" width="250px">
        <Slider
          value={sequencerConfiguration?.bpm ?? DEFAULT_BPM}
          min={MIN_BPM}
          max={MAX_BPM}
          onChange={debounce(onUpdateBpm, 200)}
        >
          <SliderTrack bg="red.100">
            <SliderFilledTrack bg="tomato" />
          </SliderTrack>
          <SliderThumb boxSize={5} />
        </Slider>
      </Box>
    </div>
  );
};
