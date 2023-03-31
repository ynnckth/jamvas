import React, { useEffect } from "react";
import "./GlobalSequencerControls.css";
import { useAppDispatch, useAppSelector } from "../../../../app/reduxHooks";
import { selectCurrentBpm, selectIsSequencerStopped } from "../../sequencerSelectors";
import { setBpm, startSequencer, stopSequencer } from "../../sequencerThunks";
import { FaPause, FaPlay } from "react-icons/fa";
import { MAX_BPM, MIN_BPM } from "../../constants";
import { debounce } from "lodash";

export const GlobalSequencerControls: React.FC = () => {
  const dispatch = useAppDispatch();
  const isSequencerStopped = useAppSelector(selectIsSequencerStopped);
  const currentBpm = useAppSelector(selectCurrentBpm);

  const onKeyPressed = (event: KeyboardEvent) => {
    if (event.code === "Space") {
      toggleStopped();
    }
  };

  const onUpdateBpm = (event: any) => dispatch(setBpm(Number(event.target.value)));

  const toggleStopped = () => (isSequencerStopped ? dispatch(startSequencer()) : dispatch(stopSequencer()));

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
          defaultValue={currentBpm}
          onChange={debounce(onUpdateBpm, 200)}
        />
      </div>
    </div>
  );
};
