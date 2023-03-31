import React from "react";
import "./App.css";
import { GlobalSequencer } from "./features/sequencer/components/GlobalSequencer/GlobalSequencer";
import { start } from "tone";

const App: React.FC = () => {
  return (
    <div className="App">
      {/* TODO: Insert jamvas logo */}
      <h1
        onClick={async () => {
          await start();
          console.log("Tone started");
        }}
      >
        Jamvas
      </h1>
      <div className="card">
        <p>Join the jam session!</p>
      </div>
      <GlobalSequencer />
    </div>
  );
};

export default App;
