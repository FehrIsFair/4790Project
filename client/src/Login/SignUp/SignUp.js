import React, { useContext } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { Card, TextField, Button } from "@material-ui/core";

import { Authentication } from "../../Authentication/Authentication";

const SignUp = () => {
  // All of the hooks needed to make the component work
  const authContext = useContext(Authentication);
  const history = useHistory();
  // This separates the sign in functions form the context.

  if (authContext.isAuthenticated) {
    history.push("/Search");
  }

  return (
    <Card id="login">
      <h4>Sign Up</h4>
      <Card>
        {/* Using Formik, we set the expected values, then steup the logic and validation. After that its a pretty simple form */}
        <Formik
          initialValues={{
            UserName: "",
          }}
          validationSchema={Yup.object().shape({
            UserName: Yup.string()
              .min(10, "Too short")
              .max(50, "Too long")
              .required("Must enter an email"),
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              authContext.userNameHandler(values.UserName)
              history.push("/Search");
            } catch (err) {
              console.error(err);
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
                error={Boolean(touched.Email && errors.Email)}
                helpertext={touched.Email && errors.Email}
              />
              <Button
                className="button"
                variant="contained"
                disabled={errors.Username || errors.Password}
                type="Submit"
              >
                Sign Up
              </Button>
            </form>
          )}
        </Formik>
      </Card>
    </Card>
  );
};
export default SignUp;
