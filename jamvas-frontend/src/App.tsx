import React, { useEffect } from "react";
import "./App.css";
import { Session } from "./components/Session/Session";
import { useAppSelector } from "./store/reduxHooks";
import { selectIsToneInitialized } from "./store/sequencer/sequencerSelectors";
import JoinSessionModal from "./components/JoinSessionModal/JoinSessionModal";
import { selectUser } from "./store/session/sessionSelectors";
import { testId } from "./testing/testId";
import { printAppVersionInformationOnConsole } from "./utils/printAppVersionInformationOnConsole";

const App: React.FC = () => {
  const currentUser = useAppSelector(selectUser);
  const isToneInitialized = useAppSelector(selectIsToneInitialized);

  useEffect(() => {
    if (!import.meta.env.DEV) {
      printAppVersionInformationOnConsole();
    }
  }, []);

  return (
    <div className="App">
      {!currentUser && (
        <>
          <h1 data-testid={testId.appTitle}>Jamvas</h1>
          <JoinSessionModal />
        </>
      )}
      {currentUser && isToneInitialized && <Session />}
    </div>
  );
};

export default App;
