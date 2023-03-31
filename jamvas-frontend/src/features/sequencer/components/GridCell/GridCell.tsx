import React from "react";
import "./GridCell.css";

interface Props {
  isCurrentlyActiveStep: boolean;
  isOn: boolean;
  onClick: () => void;
  fillColor: string;
}

export const GridCell: React.FC<Props> = ({ isCurrentlyActiveStep, isOn, onClick, fillColor }) => {
  return (
    <div
      className="cell"
      style={{
        background: isOn ? fillColor : "",
        border: isCurrentlyActiveStep ? "1px solid #b3b3b3" : "1px solid #4D4D4D",
      }}
      onClick={onClick}
    />
  );
};
