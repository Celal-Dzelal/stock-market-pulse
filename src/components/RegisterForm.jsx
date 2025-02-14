import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);

  const handleRegister = async (values) => {
    try {
      const result = await dispatch(register(values)).unwrap();
      if (result) {
        navigate("/");
      }
    } catch (error) {
      console.error("Register failed:", error);
    }
  };

  /*//! ------------------------- YUP - VALIDATION SCHEMA ------------------------ */

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Cannot be shorter than two characters!")
      .max(15, "Cannot be longer than fifteen characters!")
      .required("Required"),
    firstName: Yup.string()
      .min(2, "Cannot be shorter than two characters!")
      .max(15, "Cannot be longer than fifteen characters!")
      .required("Required"),
    lastName: Yup.string()
      .min(2, "Cannot be shorter than two characters!")
      .max(15, "Cannot be longer than fifteen characters!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Cannot be shorter than eight characters!")
      .max(15, "Cannot be longer than fifteen characters!")
      .matches(/[a-z]/, "Must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Must contain at least one uppercase letter")
      .matches(/\d+/, "Must contain at least one numeric value")
      .matches(
        /[!£#$%&=*?-_@æß₺]/,
        "Must contain at least one special character(!£#$%&=*?-_@æß₺)"
      ),
  });

  /*//! ------------------------- YUP - VALIDATION SCHEMA ------------------------ */
  return (
    <Formik
      initialValues={{
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={(values, actions) => {
        handleRegister(values);
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
            name="firstName"
            label="First Name"
            variant="outlined"
            fullWidth
            value={values.firstName}
            onChange={handleChange}
            error={touched.firstName && errors.firstName}
            helperText={touched.firstName && errors.firstName}
            onBlur={handleBlur}
            margin="normal"
          />
          <TextField
            name="lastName"
            label="Last Name"
            variant="outlined"
            fullWidth
            value={values.lastName}
            onChange={handleChange}
            error={touched.lastName && errors.lastName}
            helperText={touched.lastName && errors.lastName}
            onBlur={handleBlur}
            margin="normal"
          />
          <TextField
            name="email"
            label="EMail"
            variant="outlined"
            fullWidth
            value={values.email}
            onChange={handleChange}
            error={touched.email && errors.email}
            helperText={touched.email && errors.email}
            onBlur={handleBlur}
            margin="normal"
            type="email"
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
              {typeof error === "object"
                ? "User is already registered" || error.error
                : error}
            </Typography>
          )}
          <Button variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default RegisterForm;
