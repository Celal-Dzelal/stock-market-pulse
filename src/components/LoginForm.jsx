import React, { useRef } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);

  const handleLogin = async (values) => {
    try {
      const result = await dispatch(login(values)).unwrap();
      if (result) {
        navigate("/stock");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const SignupSchema = Yup.object().shape({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={SignupSchema}
      onSubmit={(values, actions) => {
        handleLogin(values);
        actions.resetForm();
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
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
          />
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
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 2 }}>
              {typeof error === "object" ? error.message || error.error : error}
            </Typography>
          )}
          <Button variant="contained" fullWidth type="submit">
            Sıgn In
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
