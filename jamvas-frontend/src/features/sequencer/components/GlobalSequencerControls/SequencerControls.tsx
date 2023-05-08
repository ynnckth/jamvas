import "./GlobalSequencerControls.css";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/reduxHooks";
import { selectIsSequencerStopped, selectSequencerConfiguration } from "../../sequencerSelectors";
import { setBpm } from "../../sequencerThunks";
import { FaPause, FaPlay } from "react-icons/fa";
import { MAX_BPM, MIN_BPM } from "../../constants";
import { debounce } from "lodash";
import { Box, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from "@chakra-ui/react";

interface Props {
  onStartSequence: () => void;
  onStopSequence: () => void;
}

export const SequencerControls: React.FC<Props> = ({ onStartSequence, onStopSequence }) => {
  const dispatch = useAppDispatch();
  const isSequencerStopped = useAppSelector(selectIsSequencerStopped);
  const sequencerConfiguration = useAppSelector(selectSequencerConfiguration);

  const onKeyPressed = (event: KeyboardEvent) => {
    if (event.code === "Space") {
      toggleStopped();
    }
  };

  const onUpdateBpm = (newBpm: number) => dispatch(setBpm({ newBpm: newBpm }));

  const toggleStopped = () => (isSequencerStopped ? onStartSequence() : onStopSequence());

  useEffect(() => {
    document.addEventListener("keypress", onKeyPressed);
    return () => document.removeEventListener("keypress", onKeyPressed);
  });

  return (
    <div className="sequencer-controls">
      <div className="play-stop-button" onClick={() => toggleStopped()} data-test-id="play-stop-button">
        {isSequencerStopped ? <FaPlay size={20} /> : <FaPause size={20} />}
      </div>
      <Box display="flex" alignItems="center" width="250px">
        <Slider
          defaultValue={sequencerConfiguration?.bpm}
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
