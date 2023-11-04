import React from "react";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import leftImage from "../../images/walking.png";
import rightImage from "../../images/bicycle.png";
import "./TravelMode.css";

function TravelMode({ changeTravelMode }) {
  const handleToggle = (value) => {
    console.log("Selected value:", value);
    changeTravelMode(value);
  };

  return (
    <div className="flex">
      <img src={leftImage} alt="Left" className="toggle-switch-image" />
      <ToggleSwitch
        leftValue="WALKING"
        rightValue="BICYCLING"
        onToggle={handleToggle}
      />
      <img src={rightImage} alt="Left" className="toggle-switch-image" />
    </div>
  );
}

export default TravelMode;
