import React, { useEffect } from "react";
import "./App.css";
import { Sequencer } from "./features/sequencer/components/GlobalSequencer/Sequencer";
import { useAppSelector } from "./app/reduxHooks";
import { selectIsToneInitialized } from "./features/sequencer/sequencerSelectors";
import UserRegistrationModal from "./features/session/components/UserRegistrationModal/UserRegistrationModal";
import { selectUser } from "./features/session/sessionSelectors";
import { testId } from "./testing/testId";

const App: React.FC = () => {
  const user = useAppSelector(selectUser);
  const isToneInitialized = useAppSelector(selectIsToneInitialized);

  useEffect(() => {
    console.group("App version");
    console.log("Build version: ", import.meta.env.VITE_BUILD_VERSION);
    console.log("Commit hash: ", import.meta.env.VITE_COMMIT_HASH);
    console.log("Branch name: ", import.meta.env.VITE_BRANCH_NAME);
    console.groupEnd();
  }, []);

  return (
    <div className="App">
      {!user && (
        <>
          <h1 data-testid={testId.appTitle}>Jamvas</h1>
          <UserRegistrationModal />
        </>
      )}
      {user && isToneInitialized && <Sequencer />}
    </div>
  );
};

export default App;
