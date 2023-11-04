import React, { useState, useEffect } from "react";
import "./ProfileDisplay.css";
import signupApi from "../../Api/AccountApi";

const ProfileDisplay = () => {
  const [user, setUser] = useState(null);
  const [toChangePassword, setToChangePassword] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("jwtToken");

    if (accessToken) {
      signupApi
        .getAccount(accessToken)
        .then((data) => setUser(data))
        .catch((error) => console.log(error));
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handlePasswordChange = () => {
    // Logic for password change
    // This is just a placeholder example
    console.log("Password change clicked");
  };

  return (
    <div class="h-fit pt-2">
      <div class=" h-fit mx-auto">
        <div class="inputs pt-0 w-full max-w-2xl p-6 mx-auto">
          <h2 class="text-2xl text-gray-900">Account Setting</h2>
          <form class="mt-6 border-t border-gray-400 pt-4">
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full md:w-full px-3 mb-6">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-text-1"
                >
                  user name
                </label>
                <input
                  class="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                  id="grid-text-1"
                  type="text"
                  value={user.username}
                  placeholder="Enter email"
                  required
                  disabled
                />
              </div>
              <div class="w-full md:w-full mb-6 ">
                {toChangePassword ? (
                  <>
                    <div class="w-full md:w-full px-3 mb-6">
                      <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-text-1"
                      >
                        old password
                      </label>
                      <input
                        class="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                        id="grid-text-1"
                        type="password"
                        value={user.username}
                        placeholder="old password"
                        required
                        disabled
                      />
                    </div>
                    <div class="w-full md:w-full px-3 mb-6">
                      <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-text-1"
                      >
                        new password
                      </label>
                      <input
                        class="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                        id="grid-text-1"
                        type="password"
                        placeholder="Enter password"
                        required
                        disabled
                      />
                    </div>
                    <button
                      class="appearance-none bg-gray-200 text-gray-900 px-2 py-1 shadow-sm border border-gray-400 rounded-md ml-3"
                      type="button"
                      onClick={() => {
                        setToChangePassword(false);
                      }}
                    >
                      Change password
                    </button>
                  </>
                ) : (
                  <div className="ml-4">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      password
                    </label>
                    <button
                      class="appearance-none bg-gray-200 text-gray-900 px-2 py-1 shadow-sm border border-gray-400 rounded-md "
                      onClick={() => {
                        setToChangePassword(true);
                      }}
                    >
                      change your password
                    </button>
                  </div>
                )}
              </div>

              <div class="personal w-full border-t border-gray-400 pt-4">
                <h2 class="text-2xl text-gray-900">Personal info:</h2>
                <div class="flex items-center justify-between mt-4 flex-wrap md:flex-nowrap">
                  <div class="w-full md:w-1/2 px-3 mb-6">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      first name
                    </label>
                    <input
                      class="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                      type="text"
                      required
                      value={user.firstName}
                      disabled
                    />
                  </div>
                  <div class="w-full md:w-1/2 px-3 mb-6">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      last name
                    </label>
                    <input
                      class="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                      type="text"
                      required
                      value={user.lastName}
                      disabled
                    />
                  </div>
                </div>
                <div class="w-full md:w-full px-3 mb-6">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    email
                  </label>
                  <input
                    class="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                    type="text"
                    required
                    value={user.email}
                    disabled
                  />
                </div>

                <div class="flex justify-end">
                  <button
                    class="appearance-none bg-gray-200 text-gray-900 px-2 py-1 shadow-sm border border-gray-400 rounded-md mr-3"
                    type="button"
                  >
                    save changes
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileDisplay;
