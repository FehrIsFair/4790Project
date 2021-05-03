import React, { useContext, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { Card, TextField, Button } from "@material-ui/core";

import { Authentication } from "../../Authentication/Authentication";
import PasswordError from "../../Errors/PasswordError/PasswordError"

const SignUp = () => {
  // All of the hooks needed to make the component work
  const authContext = useContext(Authentication);
  const history = useHistory();
  const [passwordError, setPasswordError] = useState(Boolean);
  // This separates the sign in functions form the context.

  if (authContext.isAuthenticated) {
    history.push("/Search");
  }

  return (
    <Card id="login">
      <h4>Sign Up</h4>
      {passwordError ? <PasswordError /> : null}
      <Card>
        {/* Using Formik, we set the expected values, then steup the logic and validation. After that its a pretty simple form */}
        <Formik
          initialValues={{
            UserName: "",
            Password: "",
            Confirm: "",
            FavCharacter: "",
            FavAnime: "",
            FavManga: "",
          }}
          validationSchema={Yup.object().shape({
            UserName: Yup.string()
              .min(10, "Too short")
              .max(50, "Too long")
              .required("Must enter an Username"),
            Password: Yup.string()
              .min(10, "Too short")
              .max(50, "Too long")
              .required("Must enter an Password"),
            Confirm: Yup.string()
              .min(10, "Too short")
              .max(50, "Too long")
              .required("Must confirm your Password"),
            FavCharacter: Yup.string(),
            FavAnime: Yup.string(),
            FavManga: Yup.string(),
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            debugger;
            try {
              const auth = await authContext.signUp(
                values.UserName, 
                values.Password, 
                values.Confirm, 
                values.FavAnime, 
                values.FavCharacter, 
                values.FavManga
                );
              if (auth) {
                history.push("/Search")
              } else {
                setPasswordError(true)
              }
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
                value={values.UserName}
                required
                error={Boolean(touched.UserName && errors.UserName)}
                helpertext={touched.UserName && errors.UserName}
              />
              <TextField
                autoFocus
                id="outlined-basic"
                name="Password"
                className="textfield"
                label="password"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                type="password"
                value={values.Password}
                required
                error={Boolean(touched.Password && errors.Password)}
                helpertext={touched.Password && errors.Password}
              />
              <TextField
                autoFocus
                type="password"
                id="outlined-basic"
                name="Confirm"
                className="textfield"
                label="confirm"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.Confirm}
                required
                error={Boolean(touched.Confirm && errors.Confirm)}
                helpertext={touched.Confirm && errors.Confirm}
              />
              <TextField
                autoFocus
                id="outlined-basic"
                name="FavAnime"
                className="textfield"
                label="favanime"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.FavAnime}
                error={Boolean(touched.FavAnime && errors.FavAnime)}
                helpertext={touched.FavAnime && errors.FavAnime}
              />
              <TextField
                autoFocus
                id="outlined-basic"
                name="FavCharacter"
                className="textfield"
                label="favcharacter"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.FavCharacter}
                error={Boolean(touched.FavCharacter && errors.FavCharacter)}
                helpertext={touched.FavCharacter && errors.FavCharacter}
              />
              <TextField
                autoFocus
                id="outlined-basic"
                name="FavManga"
                className="textfield"
                label="favmanga"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.FavManga}
                error={Boolean(touched.FavManga && errors.FavManga)}
                helpertext={touched.FavMagna && errors.FavManga}
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
