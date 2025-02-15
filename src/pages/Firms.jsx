import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { firms } from "../features/authSlice";

const Firms = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(firms(token)).then((result) => {
        console.log("Thunk result:", result);
      });
    }
  }, [dispatch, token]);

  return <div>{firms.payload}</div>;
};

export default Firms;
