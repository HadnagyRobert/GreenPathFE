import React, { useState } from "react";
import Switch from "@mui/material/Switch";

function ToggleSwitch({ leftValue, rightValue, onToggle }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onToggle(newValue ? rightValue : leftValue);
  };

  return <Switch checked={isChecked} onChange={handleToggle} />;
}

export default ToggleSwitch;