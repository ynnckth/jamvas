import "./GlobalSequencerControls.css";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/reduxHooks";
import { selectIsSequencerStopped, selectSequencerConfiguration } from "../../sequencerSelectors";
import { setBpm } from "../../sequencerThunks";
import { FaPause, FaPlay } from "react-icons/fa";
import { MAX_BPM, MIN_BPM } from "../../constants";
import { debounce } from "lodash";

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

  const onUpdateBpm = (event: any) => dispatch(setBpm({ newBpm: Number(event.target.value) }));

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
      <div className="bpm-slider">
        <input
          type="range"
          min={MIN_BPM}
          max={MAX_BPM}
          defaultValue={sequencerConfiguration?.bpm}
          onChange={debounce(onUpdateBpm, 200)}
        />
      </div>
    </div>
  );
};
