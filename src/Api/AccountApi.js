import api from "./InterpeterConfig";

const AccountApi = {
    signup: (signupRequest) => {return api.post("/accounts", signupRequest).then((response) => response.data.id)},
    getAccount: (accessToken) => { return api.post("/accounts/get", accessToken).then((response) => response.data)},
};

export default AccountApi;