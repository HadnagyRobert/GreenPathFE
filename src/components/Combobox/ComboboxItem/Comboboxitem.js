import React from 'react'

function Comboboxitem({ place_id, description, setSelectedValue}) {
    const handleOnClick = () => {
        setSelectedValue(description);
    }
  return (
    <li key={place_id} onClick={handleOnClick}>{description}</li>
  )
}

export default Comboboxitem