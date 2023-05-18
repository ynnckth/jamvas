import React, { useEffect } from "react";
import "./App.css";
import { Sequencer } from "./features/sequencer/components/GlobalSequencer/Sequencer";
import { useAppSelector } from "./app/reduxHooks";
import { selectIsToneInitialized } from "./features/sequencer/sequencerSelectors";
import UserRegistrationModal from "./features/session/components/UserRegistrationModal/UserRegistrationModal";
import { selectUser } from "./features/session/sessionSelectors";
import { testId } from "./testing/testId";
import { printAppVersionInformationOnConsole } from "./app/printAppVersionInformationOnConsole";

const App: React.FC = () => {
  const user = useAppSelector(selectUser);
  const isToneInitialized = useAppSelector(selectIsToneInitialized);

  useEffect(() => {
    if (!import.meta.env.DEV) {
      printAppVersionInformationOnConsole();
    }
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
