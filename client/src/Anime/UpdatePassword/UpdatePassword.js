import React, {useContext, useState} from "react";
import {Card, Typography, TextField, Button} from "@material-ui/core"
import {Formik} from "formik";
import { Redirect } from "react-router";
import * as Yup from "yup";
import axios from "axios";

import {Authentication} from "../../Authentication/Authentication"

const authMethod = axios.create({
  baseURL: "http://localhost:6060",
})

const UpdatePassword = () => {
  const authContext = useContext(Authentication);
  const [error, setError] = useState(Boolean);
  const [success, setSuccess] = useState(Boolean);

  const sendPasswordUpdate = async (_password, _confirm) => {
    if (_password === _confirm) {
      try {
        await authMethod.put("/api/Change", {
          UserName: authContext.userName,
          Password: _password
        });
        setError(false);
        setSuccess(true);
      } catch (err) {
        console.log(err);
      }
    } else {
      setError(true);
    }
  }

  if (!authContext.auth) {
    return <Redirect path="/" />;
  }
  return (
    <Card>
      <Typography>Change Password</Typography>
      {success ? <Card> Success </Card> : null}
      {error ? <Card> Error </Card> : null}
      <Formik
          initialValues={{
            Password: "",
            Confirm: "",
          }}
          validationSchema={Yup.object().shape({
            Password: Yup.string()
              .min(10, "Too short")
              .max(50, "Too long")
              .required("Must enter an Password"),
            Confirm: Yup.string()
              .min(10, "Too short")
              .max(50, "Too long")
              .required("Must confirm your Password"),
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              debugger;
              await sendPasswordUpdate(values.Password, values.Confirm);
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
              <Button
                className="button"
                variant="contained"
                disabled={errors.Password || errors.Confirm}
                type="Submit"
              >
                Sign Up
              </Button>
            </form>
          )}
        </Formik>
    </Card>
  )
}
export default UpdatePassword;