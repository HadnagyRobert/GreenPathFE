import api from "./InterpeterConfig";

const routeApi = {
    generateRoute: (routeRequest) => {return api.post("/route", routeRequest).then((response) => response.data)},
    generateRouteTime: (timeRouteRequest) => {return api.post("/route/time", timeRouteRequest).then((response) => response.data)},
};

export default routeApi;