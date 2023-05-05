import React, { useEffect } from "react";
import "./App.css";
import { GlobalSequencer } from "./features/sequencer/components/GlobalSequencer/GlobalSequencer";
import { useAppDispatch, useAppSelector } from "./app/reduxHooks";
import { selectIsToneInitialized } from "./features/sequencer/sequencerSelectors";
import { initializeTone } from "./features/sequencer/sequencerThunks";
import { fetchUsers } from "./api/userApi";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const isToneInitialized = useAppSelector(selectIsToneInitialized);

  // TODO: remove, only here for testing integration with backend
  useEffect(() => {
    fetchUsers().then((users) => console.log(users));
  });

  return (
    <div className="App">
      <h1>Jamvas</h1>
      {!isToneInitialized ? (
        <div
          style={{ border: "1px solid var(--cyan)", borderRadius: "5px", color: "var(--cyan)" }}
          onClick={async () => {
            // TODO: show pop-up with username form, upon confirmation, proceed
            dispatch(initializeTone());
          }}
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
