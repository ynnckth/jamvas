import React from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { GlobalSequencer } from "./features/sequencer/components/GlobalSequencer/GlobalSequencer";

const App: React.FC = () => {
  return (
    <div className="App">
      {/* TODO: Insert jamvas logo */}
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Jamvas</h1>
      <div className="card">
        <p>Join the jam session!</p>
      </div>
      <GlobalSequencer />
    </div>
  );
};

export default App;
