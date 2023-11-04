import React, { useEffect, useState } from "react";
import "./ComboBoxCustom.css";
import Comboboxitem from "./ComboboxItem/Comboboxitem";

function ComboBoxCustom({
  values,
  handleInputClick,
  inputValue,
  disabled,
  value,
  setValue,
  placeholder,
  onSelect,
  status,
}) {
  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    if (selectedValue) {
      onSelect(selectedValue);
    }
  }, [selectedValue]);

  return (
    <div className="relative text-black ">
      <div>
        <input
          className="p-2 rounded-xl w-[20rem] lg:w-[15rem] "
          type="text"
          value={value === "" ? inputValue : value}
          name="finish"
          onClick={handleInputClick}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={disabled}
          placeholder={placeholder}
        />
        {values.length > 0 && (
          <div className="cbItems absolute w-[14rem]">
            <ul>
              {status === "OK" &&
                values.map(({ place_id, description }) => (
                  <Comboboxitem
                    key={place_id}
                    place_id={place_id}
                    description={description}
                    setSelectedValue={setSelectedValue}
                  />
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default ComboBoxCustom;
