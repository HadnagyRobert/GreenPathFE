import React, { useContext, useEffect, useState } from "react";
import "./AlternativeRouteItem.css";
import gpsImage from "../../images/gps.png";
import { AuthContext } from "../AuthContext/AuthContext";
import routeHistoryApi from "../../Api/RouteHistoryApi";
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';


export default function AlternativeRoutesListItem(props) {
  const { isAuthenticated } = useContext(AuthContext);
  const [distance, setDistance] = useState();
  const [duration, setDuration] = useState();
  const [route, setRoute] = useState();
  const [googleRedirectLink, setGoogleRedirectLink] = useState();
  const [saved, setSaved] = useState(false)

  const handeClick = () => {
    if (props.route) {
      props.setCurrentRoute(props.route);
      setRoute(props.route);
      props.handleClickSelected(props.itemIndex);
    }
  };

  const stringBuilderWaypoints = () => {
    //make the waypoint string for all legs except the first lat and last lng
    let waypoints = "";
    for (let i = 1; i < props.route.path.routes[0].legs.length - 1; i++) {
      //add startlocation lat and lng and endlocation lat and lng if not already added
      if (
        !waypoints.includes(
          `${props.route.path.routes[0].legs[i].startLocation.lat},${props.route.path.routes[0].legs[i].startLocation.lng}`
        )
      ) {
        waypoints += `${props.route.path.routes[0].legs[i].startLocation.lat},${props.route.path.routes[0].legs[i].startLocation.lng}|`;
      }
      if (
        !waypoints.includes(
          `${props.route.path.routes[0].legs[i].endLocation.lat},${props.route.path.routes[0].legs[i].endLocation.lng}`
        )
      ) {
        waypoints += `${props.route.path.routes[0].legs[i].endLocation.lat},${props.route.path.routes[0].legs[i].endLocation.lng}|`;
      }
    }
    return waypoints;
  };

  useEffect(() => {
    if (props.decodedPolyline.length > 0) {
      let startLat = props.route.path.routes[0].legs[0].startLocation.lat;
      let startLng = props.route.path.routes[0].legs[0].startLocation.lng;
      //get the endLocation of the route from the last leg
      let endLat =
        props.route.path.routes[0].legs[
          props.route.path.routes[0].legs.length - 1
        ].endLocation.lat;
      let endLng =
        props.route.path.routes[0].legs[
          props.route.path.routes[0].legs.length - 1
        ].endLocation.lng;
      let travelMode = props.travelMode.toLowerCase();
      let googleRedirectLink = `https://www.google.com/maps/dir/?api=1&origin=${startLat},${startLng}&destination=${endLat},${endLng}&travelmode=${travelMode}&waypoints=${stringBuilderWaypoints()}`;
      setGoogleRedirectLink(googleRedirectLink);
      console.log("google " + googleRedirectLink);
    }
  }, [props.decodedPolyline]);

  const sendToGoogleMaps = () => {
    if (props.route) {
      window.open(googleRedirectLink, "_blank");
      // let googleRedirectLink = `https://www.google.com/maps/dir/?api=1&origin=${props.route.legs[0].startLocation.lat},${props.route.legs[0].startLocation.lng}&destination=${props.route.legs[0].endLocation.lat},${props.route.legs[0].endLocation.lng}&travelmode=driving`;
    }
  };

  const getDistance = () => {
    setDistance(convertMetersToHumanReadable(props.route.statistics.distance));
    setDuration(convertSecondsToHumanReadable(props.route.statistics.duration));
  };

  useEffect(() => {
    if (props.route) {
      getDistance();
    }
  }, []);

  const convertMetersToHumanReadable = (meters) => {
    if (meters < 1000) {
      return `${meters} m`;
    } else {
      return `${(meters / 1000).toFixed(1)} km`;
    }
  };

  const convertSecondsToHumanReadable = (seconds) => {
    if (seconds < 60) {
      return `${seconds} s`;
    } else {
      return `${Math.round(seconds / 60)} mins`;
    }
  };

  
  const handleSaveRoute = () => {
    if (!isAuthenticated) { return; }
    if (saved) { return; }

    const rDate = new Date().toISOString().split('T')[0];

    const request = {
        origin: props.inputValues.start,
        destination: props.inputValues.finish,
        length: distance.split(" ")[0],
        duration: duration.split(" ")[0],
        date: rDate,
    }

    routeHistoryApi.createRouteHistory(request);
    setSaved(true);
  }

  return (
    <div>
      <div
        className={`item-container p-3 ${props.selected ? "selected" : ""}`}
        onClick={handeClick}>
        <li>
          <div className="custom-grid text-xl">
            <div>
              <p>
                Distance:{" "}
                {Object.keys(props.route).length === 0 ? "" : distance}
              </p>
            </div>
            <div>
              <p>
                Time: {Object.keys(props.route).length === 0 ? "" : duration}
              </p>
            </div>
            <div className="google_redirect">
              <button>
                <img src={gpsImage} onClick={sendToGoogleMaps} />
              </button>
            </div>
            <div>
              <span className="text-gray-400">
                CO2 emitted by car:{" "}
                {props.route.statistics.expectedCO2EmissionByCar.toFixed(2)} kg
              </span>
            </div>
            <div className="col-span-2 w-full">
                            {isAuthenticated ? (
                                <IconButton aria-label="save" class="float-right" onClick={handleSaveRoute}>
                                    {saved ? (<StarIcon />) : (<StarBorderIcon />)}
                                </IconButton>
                            ) :
                                (<div> </div>)}
                        </div>
          </div>
        </li>
      </div>
    </div>
  );
}
