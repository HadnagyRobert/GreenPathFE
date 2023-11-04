import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  Marker,
  Polyline,
  useJsApiLoader,
} from "@react-google-maps/api";
import polyline from "@mapbox/polyline";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

// let styleId = "4a266c11cebc8e83"
// { style }, {changeStyle}
function Map({
  style,
  setMapLoaded,
  finishLocation,
  startLocation,
  handleStartLocation,
  handelFinishLocation,
  currentRoute,
  decodedPolyline,
  setDecodedPolyline,
}) {
  const [mapKey, setMapKey] = useState(0);
  const [center, setCenter] = useState({ lat: 51.4503, lng: 5.4677 });
  const [startMarkerLocation, setStartMarkerLocation] = useState(startLocation);
  const [finishMarkerLocation, setFinishMarkerLocation] =
    useState(finishLocation);
  const [centerKey, setCenterKey] = useState(20);
  const [selectedMode, setSelectedMode] = useState("WALKING"); // Default travel mode is walking
  const [mapPolyline, setMapPolyline] = useState(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (style) {
      setOptions((prevOptions) => ({ ...prevOptions, mapId: style }));
      setMapKey((prevKey) => prevKey + 1);
    }
  }, [style]);

  useEffect(() => {
    if (currentRoute) {
      setDecodedPolyline(
        polyline
          .decode(currentRoute.path.routes[0].overviewPolyline.encodedPath)
          .map(([lat, lng]) => ({ lat, lng }))
      );
    } else {
      setDecodedPolyline([]);
    }
  }, [currentRoute]);

  useEffect(() => {
    if (startLocation) {
      setStartMarkerLocation(startLocation);
      setDecodedPolyline([]);
    }
  }, [startLocation]);

  useEffect(() => {
    if (finishLocation) {
      setFinishMarkerLocation(finishLocation);
      setDecodedPolyline([]);
    }
  }, [finishLocation]);

  useEffect(() => {
    updatePolyline();
    setCenter({ lat: startLocation?.lat, lng: finishLocation?.lng });
  }, [decodedPolyline]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    // googleMapsApiKey: "AIzaSyAEYsUc29CGtcGZ6iUzRsEYAT8cwIhk_CI",
    googleMapsApiKey: "AIzaSyAUOOJhRHxY_xEz5Us0s3bQ1pT0qVlT9Lw",
    libraries: ["places"],
  });

  const onLoad = useCallback(function callback(map) {
    // const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);
    map.addListener("click", handleClick);
    map.addListener("rightclick", handleRightClick);

    setMap(map);
    setMapLoaded(true);
  }, []);

  const updatePolyline = () => {
    if (mapPolyline) {
      mapPolyline.setMap(null); // Remove the old polyline from the map
      setMapPolyline(null);
    }

    if (decodedPolyline.length > 0) {
      const newPolyline = new window.google.maps.Polyline({
        path: decodedPolyline,
        strokeColor: "#0000FF",
        strokeOpacity: 1,
        strokeWeight: 6,
        icons: [
          {
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              fillColor: "#FFFFFF",
              fillOpacity: 1,
              scale: 3,
              strokeWeight: 0,
            },
            offset: "0",
            repeat: "50px",
          },
        ],
        map: map,
      });

      setMapPolyline(newPolyline);
    }
  };

  const [options, setOptions] = useState({
    mapTypeControl: false,
    mapTypeId: "roadmap",
    streetViewControl: false,
    mapId: style,
    zoom: 14,
    fullscreenControl: false,
  });

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const userLocation = (map) => {
    navigator.geolocation.getCurrentPosition((loc) => {
      setCenter({ lat: loc.coords.latitude, lng: loc.coords.longitude });
      setCenterKey((prevKey) => prevKey + 1);
    });
  };

  useEffect(() => {
    userLocation(map);
  }, [map]);

  const handleClick = (map) => {
    handleStartLocation({ lat: map.latLng.lat(), lng: map.latLng.lng() });
  };

  const handleRightClick = (map) => {
    handelFinishLocation({ lat: map.latLng.lat(), lng: map.latLng.lng() });
  };

  const handleModeChange = (event) => {
    setSelectedMode(event.target.value);
  };

  return isLoaded ? (
    <>
      <GoogleMap
        key={mapKey}
        mapContainerStyle={containerStyle}
        center={center}
        onLoad={onLoad}
        onUnmount={onUnmount}
        mapTypeId="roadmap"
        options={options}
      >
        {startMarkerLocation && <Marker position={startMarkerLocation} />}
        {finishMarkerLocation && <Marker position={finishMarkerLocation} />}
        <Marker
          key={centerKey}
          position={center}
          animation={window.google.maps.Animation.DROP}
          icon={{
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillOpacity: 1,
            strokeWeight: 3,
            fillColor: "#5384ED",
            strokeColor: "#ffffff",
          }}
        ></Marker>
        <button
          type="button"
          style={{
            color: "#666666",
            backgroundColor: "white",
            position: "absolute",
            bottom: "115px",
            right: "10px",
            padding: "8px 5px 5px 5px",
            borderRadius: "5px",
            border: " 0.1px solid #666666",
            cursor: "pointer",
          }}
          onClick={userLocation}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            className="bi bi-geo-alt-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
          </svg>
        </button>
      </GoogleMap>
    </>
  ) : (
    <></>
  );
}

export default Map;
