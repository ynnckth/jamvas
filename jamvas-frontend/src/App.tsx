import React from "react";
import "./App.css";
import { GlobalSequencer } from "./features/sequencer/components/GlobalSequencer/GlobalSequencer";
import { useAppDispatch, useAppSelector } from "./app/reduxHooks";
import { selectIsToneInitialized } from "./features/sequencer/sequencerSelectors";
import { initializeTone } from "./features/sequencer/sequencerThunks";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const isToneInitialized = useAppSelector(selectIsToneInitialized);

  return (
    <div className="App">
      <h1>Jamvas</h1>
      {!isToneInitialized ? (
        <div
          style={{ border: "1px solid var(--cyan)", borderRadius: "5px", color: "var(--cyan)" }}
          onClick={async () => dispatch(initializeTone())}
        >
          Start
        </div>
      ) : (
        <GlobalSequencer />
      )}
    </div>
  );
};

export default App;
