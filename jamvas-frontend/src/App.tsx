import React from "react";
import "./App.css";
import { Sequencer } from "./features/sequencer/components/GlobalSequencer/Sequencer";
import { useAppSelector } from "./app/reduxHooks";
import { selectIsToneInitialized } from "./features/sequencer/sequencerSelectors";
import UserRegistrationModal from "./features/session/components/UserRegistrationModal/UserRegistrationModal";
import { selectUser } from "./features/session/sessionSelectors";

const App: React.FC = () => {
  const user = useAppSelector(selectUser);
  const isToneInitialized = useAppSelector(selectIsToneInitialized);

  return (
    <div className="App">
      <h1>Jamvas</h1>
      {!user && <UserRegistrationModal />}
      {user && isToneInitialized && <Sequencer />}
    </div>
  );
};

export default App;
