import api from "./InterpeterConfig";

const routeHistoryApi = {
    getAllRouteHistory: (id) => {
        return api.get(`/profile/routes/${id}`)
            .then((response) => response.data.routes)
    },

    createRouteHistory: (createRequest) => {
        api.post("/profile/routes", createRequest)
        .then((response) => response.data.routeId)
    },

    deleteRouteHistory: (id) => {
        return api.delete(`/profile/routes/${id}`)
    },

    deleteAllRouteHistory: (uId) => {
        api.delete(`/profile/routes/all/${uId}`)
    }
};

export default routeHistoryApi;
