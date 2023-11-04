import React, { useContext, useState } from "react";
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import singupApi from "../../Api/AccountApi";
import loginApi from "../../Api/LoginApi";
import { AuthContext } from "../AuthContext/AuthContext";
import CustomInput from "../CustomInput/CustomInput";

function SignInUpForm() {
  const [signIn, setSignIn] = useState(false);
  const [error, setError] = useState(false);
  const { login } = useContext(AuthContext);

  const signUpValidationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const signInValidationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const initialValuesSignUp = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  };

  const initialValuesSignIn = {
    username: "",
    password: "",
  };

  const onSubmitSignUp = (values, { setSubmitting }) => {
    const request = {
      username: values.username,
      password: values.password,
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
    };

    singupApi
      .signup(request)
      .then((response) => console.log(response))
      .catch((error) => errorHandler(error));
    setSubmitting(false);
    setSignIn(false);
  };

  const onSubmitSignIn = (values, { setSubmitting }) => {
    const request = {
      username: values.username,
      password: values.password,
    };

    loginApi
      .login(request)
      .then((response) => login(response))
      .catch((error) => errorHandler(error.response));

    setSubmitting(false);
  };

  const handleOnClick = () => {
    setSignIn((prev) => !prev);
    setError(false);
  };

  const errorHandler = (error) => {
    if (
      error.data.status === 400 &&
      error.data.message === "INVALID_CREDENTIALS"
    ) {
      setError(true);
    }
  };

  return (
    <div
      className={signIn ? "container right-panel-active" : "container"}
      id="container"
    >
      <div className="form-container sign-up-container">
        <Formik
          initialValues={initialValuesSignUp}
          onSubmit={onSubmitSignUp}
          validationSchema={signUpValidationSchema}
        >
          {({ isSubmitting }) => (
            <Form>
              <h1 className="mb-8">Create Account</h1>

              <span>or use your email for registration</span>
              <Field
                component={CustomInput}
                label="First Name"
                name="firstName"
                type="text"
                placeholder="Enter your first name"
                classes="w-full"
                statusErrorState={error}
              />
              <Field
                component={CustomInput}
                label="Last Name"
                name="lastName"
                type="text"
                placeholder="Enter your last name"
                classes="w-full"
                statusErrorState={error}
              />
              <Field
                component={CustomInput}
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your email"
                classes="w-full"
                statusErrorState={error}
              />
              <Field
                component={CustomInput}
                label="Username"
                name="username"
                type="text"
                placeholder="Enter your username"
                classes="w-full"
                statusErrorState={error}
              />
              <Field
                component={CustomInput}
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
                classes="w-full mb-6"
                statusErrorState={error}
              />
              <button type="submit" disabled={isSubmitting}>
                Sign Up
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="form-container sign-in-container">
        <Formik
          initialValues={initialValuesSignIn}
          onSubmit={onSubmitSignIn}
          validationSchema={signInValidationSchema}
        >
          {({ isSubmitting }) => (
            <Form>
              <h1 className="mb-10">Sign in</h1>

              <span>or use your account</span>
              <Field
                component={CustomInput}
                label="Username"
                name="username"
                type="text"
                placeholder="Enter your username"
                classes="w-full"
                statusErrorState={error}
              />
              <Field
                component={CustomInput}
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
                classes="w-full"
                statusErrorState={error}
              />
              <a href="#">Forgot your password?</a>
              <button type="submit" disabled={isSubmitting}>
                Sign In
              </button>
              {error ? (
                <span className="text-red-600 mt-5 font-bold">
                  Invalid Credentials
                </span>
              ) : null}
            </Form>
          )}
        </Formik>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <button class="ghost" id="signIn" onClick={handleOnClick}>
              Sign In
            </button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button class="ghost" id="signUp" onClick={handleOnClick}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInUpForm;
