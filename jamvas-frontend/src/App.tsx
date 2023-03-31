import React from "react";
import "./App.css";
import { GlobalSequencer } from "./features/sequencer/components/GlobalSequencer/GlobalSequencer";

const App: React.FC = () => {
  return (
    <div className="App">
      {/* TODO: Insert jamvas logo */}
      <h1>Jamvas</h1>
      <div className="card">
        <p>Join the jam session!</p>
      </div>
      <GlobalSequencer />
    </div>
  );
};

export default App;
