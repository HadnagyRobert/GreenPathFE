import React, { useState, useEffect } from "react";
import AlternativeRoutesListItem from "../AlternativeRouteItem/AlternativeRouteItem";
import "./AlternativeRoutesList.css";

export default function AlternativeRoutesList(props) {
  const [selected, setSelected] = useState({
    0: true,
    1: false,
    2: false,
  });
  const [show, setShow] = useState(true);
  console.log("AlternativeRoutesList");
  console.log(props.generatedRoutes);

  const handeClick = () => {
    setShow(!show);
  };

  const handleClickSelected = (index) => {
    let newSelected = {
      0: false,
      1: false,
      2: false,
    };
    newSelected[index] = true;
    setSelected(newSelected);
  };

  useEffect(() => {
    console.log("generated routes",props.generatedRoutes);
  }, []);

  return (
    <div className="routes-list-main">
      {props.generatedRoutes.length !== 0 && (
        <div className="routes-list-container w-[31rem]">
          {/* <div className='locations'>
                <div>
                    <p>{props.generatedRoutes[0].legs[0].startAddress}</p>
                </div>
                <div>
                    <p>→</p>
                </div>
                <div>
                    <p>{props.generatedRoutes[0].legs[0].endAddress}</p>
                </div>
            </div> */}
          {show && (
            <ul className="style-none">
              {props.generatedRoutes.map((route, index) => (
                // <AlternativeRoutesListItem
                //   itemIndex={index}
                //   route={route}
                //   setCurrentRoute={props.setCurrentRoute}
                //   selected={selected[index]}
                //   handleClickSelected={handleClickSelected}
                  // travelMode={props.travelMode}
                //   decodedPolyline={props.decodedPolyline}
                // />
                <AlternativeRoutesListItem 
                itemIndex={index} 
                route={route} 
                setCurrentRoute={props.setCurrentRoute} 
                selected={selected[index]} 
                handleClickSelected={handleClickSelected} 
                inputValues={props.inputValues}
                decodedPolyline={props.decodedPolyline}
                travelMode={props.travelMode}
                />
              ))}
            </ul>
          )}
          <div className="routes-bottom text-center">
            <button
              onClick={handeClick}
              className="bg-white p-3 w-full rounded-xl"
            >
              Show alternative routes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
