import React from "react";
import "./GridCell.css";

interface Props {
  isCurrentlyActiveStep: boolean;
  isOn: boolean;
  onClick: () => Promise<void>;
  fillColor: string;
}

export const GridCell: React.FC<Props> = ({ isCurrentlyActiveStep, isOn, onClick, fillColor }) => {
  return (
    <div
      className="cell"
      style={{
        background: isOn ? fillColor : "",
        border: isCurrentlyActiveStep ? "1px solid var(--yellow)" : "1px solid #4D4D4D",
        transition: "background 0.5s ease-in-out",
      }}
      onClick={onClick}
    />
  );
};
