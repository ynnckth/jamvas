import React, { useEffect } from "react";
import "./App.css";
import { Sequencer } from "./components/GlobalSequencer/Sequencer";
import { useAppSelector } from "./store/reduxHooks";
import { selectIsToneInitialized } from "./store/sequencer/sequencerSelectors";
import UserRegistrationModal from "./components/UserRegistrationModal/UserRegistrationModal";
import { selectUser } from "./store/session/sessionSelectors";
import { testId } from "./testing/testId";
import { printAppVersionInformationOnConsole } from "./utils/printAppVersionInformationOnConsole";

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
