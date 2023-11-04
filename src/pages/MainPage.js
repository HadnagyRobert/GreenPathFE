import React, { useEffect, useState } from "react";
import Map from "../components/Map";
import NavBar from "../components/NavBar";
import AlternativeRoutesList from "../components/AlternativeRoutesList/AlternativeRoutesList";

function MainPage() {
  // const [style, setStyle] = useState("4a266c11cebc8e83")
  const [style, setStyle] = useState("41e92765ade221af");
  const [inputValues, setInputValues] = useState({
    start: "",
    finish: "",
  });
  const [startLocation, setStartLocation] = useState();
  const [finishLocation, setFinishLocation] = useState();
  const [generatedRoutes, setGeneratedRoutes] = useState([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [decodedPolyline, setDecodedPolyline] = useState([]);
  const [currenRoute, setCurrentRoute] = useState();
  const [travelMode, setTravelMode] = useState("WALKING");

  const handelFinishLocation = (location) => {
    setFinishLocation(location);
  };

  const handleStartLocation = (location) => {
    setStartLocation(location);
  };

  const changeStyle = (dStyle) => {
    setStyle(dStyle);
  };

  useEffect(() => {
    if (generatedRoutes.length > 0) {
      setCurrentRoute(generatedRoutes[0]);
    } else {
      setCurrentRoute(null);
    }
  }, [generatedRoutes]);

  return (
    <>
      <NavBar
        changeStyle={changeStyle}
        generatedRoutes={generatedRoutes}
        inputValues={inputValues}
        setInputValues={setInputValues}
        mapLoaded={mapLoaded}
        startLocation={startLocation}
        finishLocation={finishLocation}
        setGeneratedRoutes={setGeneratedRoutes}
        handleStartLocation={handleStartLocation}
        handelFinishLocation={handelFinishLocation}
        travelMode={travelMode}
        setTravelMode={setTravelMode}
      />
      <Map
        style={style}
        setMapLoaded={setMapLoaded}
        startLocation={startLocation}
        finishLocation={finishLocation}
        handleStartLocation={handleStartLocation}
        handelFinishLocation={handelFinishLocation}
        currentRoute={currenRoute}
        decodedPolyline={decodedPolyline}
        setDecodedPolyline={setDecodedPolyline}
      />
      {generatedRoutes !== null && (
        <AlternativeRoutesList
          generatedRoutes={generatedRoutes}
          setCurrentRoute={setCurrentRoute}
          inputValues={inputValues}
          travelMode={travelMode}
          decodedPolyline={decodedPolyline}
        />
      )}
    </>
  );
}

export default MainPage;
