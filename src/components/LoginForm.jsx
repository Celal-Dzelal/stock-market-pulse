import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, TextField } from "@mui/material";

const LoginForm = () => {
  const SignupSchema = Yup.object().shape({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        console.log(values);
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
        <form onSubmit={handleSubmit}>
          <TextField
            name="username"
            label="Username"
            variant="outlined"
            fullWidth
            value={values.username}
            onChange={handleChange}
            error={touched.username && errors.username}
            helperText={touched.username && errors.username}
            onBlur={handleBlur}
            margin="normal"
          />{" "}
          <TextField
            name="password"
            label="Password"
            variant="outlined"
            fullWidth
            value={values.password}
            onChange={handleChange}
            error={touched.password && errors.password}
            helperText={touched.password && errors.password}
            onBlur={handleBlur}
            margin="normal"
            type="password"
          />
          <Button variant="contained" fullWidth type="submit">
            Sıgn In
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
