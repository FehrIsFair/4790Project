import React, { useContext, useEffect, useState } from "react";
import { Card, TextField, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

import { Authentication } from "../Authentication/Authentication";
import AuthError from "../Errors/AuthError/AuthError";

const Login = () => {
  // All of the hooks needed to make the component work
  const authContext = useContext(Authentication);
  const history = useHistory();
  const [isError, setIsError] = useState(Boolean);

  if (authContext.isAuthenticated) {
    history.push("/Search");
  }

  useEffect(() => {
    if (authContext.didSignOut) {
      authContext.signOutLogicHandler();
      window.location.reload();
    }
  }, [authContext]);

  return (
    <Card id="login">
      <h4>Login</h4>
      {isError ? <AuthError /> : null}
      {/* Using Formik, we set the expected values, then steup the logic and validation. After that its a pretty simple form */}
      <Formik
        initialValues={{
          UserName: "",
          Password: "",
        }}
        validationSchema={Yup.object().shape({
          UserName: Yup.string()
            .min(4, "Too short")
            .max(15, "Too long")
            .required("Must enter an Username"),
          Password: Yup.string()
            .min(4, "Too short")
            .max(15, "Too long")
            .required("Must enter an password"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          const auth = await authContext.signIn(values.UserName, values.Password);
          try {
            if (auth) {
              history.push("/Search");
            } else {
              setIsError(true);
            }
          } catch (err) {
            console.error(err);
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Card className="Login Card">
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <TextField
                autoFocus
                id="outlined-basic"
                name="UserName"
                className="textfield"
                label="username"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.Email}
                required
                error={Boolean(touched.UserName && errors.UserName)}
                helpertext={touched.UserName && errors.UserName}
              />
              <TextField
                autoFocus
                id="outlined-basic"
                name="Password"
                className="textfield"
                type="password"
                label="password"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.Email}
                required
                error={Boolean(touched.Password && errors.Password)}
                helpertext={touched.Password && errors.Password}
              />
              <Button
                className="button"
                variant="contained"
                disabled={errors.Username}
                type="Submit"
              >
                Login
              </Button>
            </form>
          </Card>
        )}
      </Formik>
    </Card>
  );
};
export default Login;
