import React, { useEffect } from "react";
import "./App.css";
import { Session } from "./components/Session/Session";
import { useAppDispatch, useAppSelector } from "./store/reduxHooks";
import { selectIsToneInitialized } from "./store/sequencer/sequencerSelectors";
import JoinSessionModal from "./components/JoinSessionModal/JoinSessionModal";
import { selectUser } from "./store/session/sessionSelectors";
import { testId } from "./testing/testId";
import { printClientVersion, printServerVersion } from "./utils/printAppVersion";
import { getServerVersion } from "./store/app/appThunks";
import { selectConnectingToServer } from "./store/app/appSelectors";
import { Spinner } from "@chakra-ui/react";

const App: React.FC = () => {
  const connectingToServer = useAppSelector(selectConnectingToServer);
  const currentUser = useAppSelector(selectUser);
  const isToneInitialized = useAppSelector(selectIsToneInitialized);
  const dispatch = useAppDispatch();

  useEffect(() => {
    printClientVersion();
    dispatch(getServerVersion())
      .unwrap()
      .then((version) => printServerVersion(version))
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className="App">
      {connectingToServer && (
        <div data-testid={testId.connectingToServerSpinner}>
          <Spinner />
          <div>Connecting</div>
        </div>
      )}
      {!connectingToServer && !currentUser && (
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
