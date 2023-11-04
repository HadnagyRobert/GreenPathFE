import api from "./InterpeterConfig";

const loginApi = {
    login: (loginRequest) => {return api.post("/login", loginRequest).then((response) => response.data.accessToken)},
};

export default loginApi;