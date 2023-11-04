import { Avatar, Button, Popover, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import "../css/NavBar.css";
import AccessButton from "./AccessibilityButton/AccessButton";
import routeApi from "../Api/RoutesApi";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import ComboBoxCustom from "./Combobox/ComboBoxCustom";
import { Nav } from "react-bootstrap";
import { AuthContext } from "./AuthContext/AuthContext";
import TravelMode from "./TravelMode/TravelMode";
import { motion, useAnimation } from "framer-motion";
import { blueGrey, green } from "@mui/material/colors";
import routeHistoryApi from "../Api/RouteHistoryApi";
import CloseIcon from "@mui/icons-material/Close";

function NavBar({
  changeStyle,
  startLocation,
  mapLoaded,
  generatedRoutes,
  finishLocation,
  setGeneratedRoutes,
  handleStartLocation,
  handelFinishLocation,
  setInputValues,
  inputValues,
  travelMode,
  setTravelMode,
}) {
  const [start, setStart] = useState("");
  const [finish, setFinish] = useState("");
  const [wereThereEnoughSensors, setWereThereEnoughSensors] = useState(true);
  const [routeTypeSelected, setRouteTypeSelected] = useState(undefined);
  const [routeTypeSelectorShow, setRouteTypeSelectorShow] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  const [isPathGenerated, setIsPathGenerated] = useState(true);
  const [animationStage, setAnimationStage] = useState(null);
  const routeTypeSelectorControls = useAnimation();

  useEffect(() => {
    if (routeTypeSelectorShow) {
      routeTypeSelectorControls.start("visible");
    } else {
      routeTypeSelectorControls.start("hidden");
    }
  }, [routeTypeSelectorShow]);

  useEffect(() => {
    if (!wereThereEnoughSensors) {
      setAnimationStage("start");
    } else {
      setAnimationStage(null);
    }
  }, [wereThereEnoughSensors]);

  useEffect(() => {
    if (animationStage === "start") {
      requestAnimationFrame(() => {
        setAnimationStage("run");
      });
    }
  }, [animationStage]);

  useEffect(() => {
    setGeneratedRoutes([]);
  }, [travelMode]);

  const handleStart = () => {
    if (startLocation === undefined) return;
    setStart(`${startLocation.lat}, ${startLocation.lng}`);
  };

  const handleFinish = () => {
    if (finishLocation === undefined) return;
    setFinish(`${finishLocation.lat}, ${finishLocation.lng}`);
  };

  const generateRoute = (e) => {
    //TODO: check if start and finish are set
    let routeRequest = {
      origin: {
        lat: startLocation.lat,
        lng: startLocation.lng,
      },
      destination: {
        lat: finishLocation.lat,
        lng: finishLocation.lng,
      },
      travelMode: travelMode,
      computeAlternativeRoutes: "true",
      languageCode: "en-US",
      sensorType: e?.target?.value,
    };

    setIsPathGenerated(false);

    routeApi.generateRoute(routeRequest).then((response) => {
      if (response.routes) {
        handleRouteGenerate(response);
      }
    });
  };

  useEffect(() => {
    handleStart();
    if (generatedRoutes.length > 0) {
      setGeneratedRoutes([]);
    }
  }, [startLocation]);

  useEffect(() => {
    handleFinish();
    if (generatedRoutes.length > 0) {
      setGeneratedRoutes([]);
    }
  }, [finishLocation]);

  useEffect(() => {
    if (startLocation && finishLocation) {
      setRouteTypeSelectorShow(true);
    }
  }, [startLocation, finishLocation]);

  const handleInputClick = (e) => {
    if (e.target.value !== "") {
      if (e.target.name === "start") {
        setInputValues({ ...inputValues, start: "" });
      } else if (e.target.name === "finish") {
        setInputValues({ ...inputValues, finish: "" });
      }
    }
  };

  const handleNotEnoughSensors = (wereThereEnoughSensors) => {
    setWereThereEnoughSensors(wereThereEnoughSensors);

    if (wereThereEnoughSensors === false) {
      setTimeout(() => {
        setWereThereEnoughSensors(!wereThereEnoughSensors);
      }, 4000);
    }
  };

  const handleRouteGenerate = (response) => {
    setGeneratedRoutes(response.routes);
    console.log("responseNav");
    console.log(response.routes);
    setInputValues({
      ...inputValues,
      start: response.routes[0].path.routes[0].legs[0].startAddress,
      finish: response.routes[0].path.routes[0].legs[0].endAddress,
    });
    setRouteTypeSelectorShow(false);
    setRouteTypeSelected(undefined);
    setIsPathGenerated(true);

    handleNotEnoughSensors(response.wereThereEnoughSensors);
  };

  const PlacesAutoCompleteStart = () => {
    let ready = false;

    const {
      value,
      setValue,
      suggestions: { status, data },
      clearSuggestions,
    } = usePlacesAutocomplete({
      requestOptions: {
        componentRestrictions: {
          country: "nl", // Restrict search results to the Netherlands
        },
        location: { lat: () => 51.4416, lng: () => 5.4697 }, // Approximate center of Eindhoven
        radius: 10 * 1000, // 10 km radius around Eindhoven
      },
    });

    useEffect(() => {
      if (mapLoaded) {
        ready = true;
      }
    }, [mapLoaded]);

    const handeSelectStart = async (address) => {
      setValue(address, false);
      clearSuggestions();

      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      console.log(lat, lng);
      handleStartLocation({ lat, lng });
      setInputValues({ ...inputValues, start: address });
    };

    return (
      <div>
        <ComboBoxCustom
          values={data}
          handleInputClick={handleInputClick}
          inputValue={inputValues.start}
          disabled={ready}
          value={value}
          setValue={setValue}
          onSelect={handeSelectStart}
          placeholder={"Enter a starting location"}
          status={status}
        />
      </div>
    );
  };

  const PlacesAutoCompleteDestination = () => {
    let ready = false;
    const {
      value,
      setValue,
      suggestions: { status, data },
      clearSuggestions,
    } = usePlacesAutocomplete({
      requestOptions: {
        componentRestrictions: {
          country: "nl", // Restrict search results to the Netherlands
        },
        location: { lat: () => 51.4416, lng: () => 5.4697 }, // Approximate center of Eindhoven
        radius: 10 * 1000, // 10 km radius around Eindhoven
      },
    });

    useEffect(() => {
      if (mapLoaded) {
        ready = true;
      }
    }, [mapLoaded]);

    const handeSelectDestination = async (address) => {
      setValue(address, false);
      clearSuggestions();

      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      console.log(lat, lng);
      handelFinishLocation({ lat, lng });
      setInputValues({ ...inputValues, finish: address });
    };
    return (
      <div>
        <ComboBoxCustom
          values={data}
          handleInputClick={handleInputClick}
          inputValue={inputValues.finish}
          value={value}
          disabled={ready}
          setValue={setValue}
          onSelect={handeSelectDestination}
          placeholder={"Enter a destination"}
          status={status}
        />
      </div>
    );
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeTravelType = (travelType) => {
    setTravelMode(travelType);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <header
      className="absolute w-full z-50 text-white h-fit opacity-90"
      style={{ backgroundColor: "#98E6B9" }}
    >
      <nav className="px-6 flex w-full  py-4 items-center ">
        <div className="text-2xl font-bold w-2/4 lg:w-3/12">
          <h1>Eindhoven transit experience</h1>
        </div>
        <div className="inputs hidden w-4/12 lg:w-6/12 mx-auto lg:mr-auto md:flex justify-evenly flex-wrap lg:flex-nowrap ">
          <PlacesAutoCompleteStart />

          <TravelMode changeTravelMode={changeTravelType} />

          <PlacesAutoCompleteDestination />
        </div>
        <Avatar
          alt="Cindy Baker"
          src=""
          className="Avatar w-1/4 md:w-1/12 ml-auto"
          onClick={handleClick}
        />
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          {/* TODO: Change content of popover according to logged user*/}
          <Typography sx={{ p: 2 }}>
            <Nav.Item>
              {isAuthenticated ? (
                <Nav.Link href="/profile">Profile</Nav.Link>
              ) : (
                <Nav.Link href="/login">Login</Nav.Link>
              )}
            </Nav.Item>
          </Typography>
        </Popover>
        {!wereThereEnoughSensors ? (
          <div
            className={`absolute bg-white rounded-xl p-4 top-[8rem] ${
              animationStage === "run" ? "animate-enter" : "animate-start"
            }`}
          >
            <p className="font-bold text-black">
              There were not enough sensors in the area to generate the most
              accurate route
            </p>
          </div>
        ) : (
          ""
        )}
        <motion.div
          variants={{
            hidden: { display: "none", opacity: 0, translateY: -100 },
            visible: {
              opacity: 1,
              display: "",
              translateY: 275,
              position: "absolute",
            },
          }}
          initial="hidden"
          animate={routeTypeSelectorControls}
          transition={{ duration: 0.5 }}
        >
          <div
            className={` grid popup-selector-container rounded-xl p-5 w-[22rem] md:w-[40rem] `}
            style={{ backgroundColor: blueGrey[500] }}
          >
            {isPathGenerated ? (
              <div className="grid grid-rows-2 ">
                <div className="text-center flex items-center justify-center mb-4">
                  <h1 className="text-2xl ml-auto">Choose a path option</h1>
                  <button
                    onClick={() => {
                      setIsPathGenerated(true);
                      setRouteTypeSelectorShow(false);
                    }}
                    className="text-2xl ml-auto"
                  >
                    <CloseIcon />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-12 ">
                  <div>
                    <button
                      onClick={(e) => generateRoute(e)}
                      value={"AIR"}
                      className={` py-4 px-2 w-full rounded-xl  text-center transition-all  ${
                        routeTypeSelected === "AIR"
                          ? "shadow-2xl scale-110"
                          : ""
                      }`}
                      style={{ backgroundColor: green[500] }}
                    >
                      Air quality
                    </button>
                  </div>
                  <div>
                    <button
                      // onClick={() => setRouteTypeSelected("SOUND")}
                      onClick={(e) => generateRoute(e)}
                      value={"SOUND"}
                      className={`py-4 px-4 rounded-xl text-center w-full transition-all ${
                        routeTypeSelected === "SOUND"
                          ? "shadow-2xl scale-110"
                          : ""
                      }`}
                      style={{ backgroundColor: green[500] }}
                    >
                      Sound
                    </button>
                  </div>
                </div>
                {routeTypeSelected !== undefined ? (
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={generateRoute}
                      class="focus:outline-none text-white hover:bg-green-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      Search
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <div className="grid place-items-center">
                <div>
                  <svg
                    aria-hidden="true"
                    class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            )}
          </div>
        </motion.div>
        <AccessButton changeStyle={changeStyle} />
      </nav>
      <div className="inputs md:hidden mb-2 w-full mx-auto flex justify-evenly flex-wrap lg:flex-nowrap ">
        <PlacesAutoCompleteStart />

        <TravelMode changeTravelMode={changeTravelType} />

        <PlacesAutoCompleteDestination />
      </div>
    </header>
  );
}

export default NavBar;
