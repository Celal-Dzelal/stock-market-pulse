import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listStockData } from "../../features/stockSlice";

const SalesTable = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { sales } = useSelector((state) => state.stock);

  useEffect(() => {
    if (token && sales.length === 0) {
      dispatch(listStockData({ item: "sales", token }));
    }
  }, [dispatch, token, sales.length]);

  console.log(sales);

  return <div>SalesTable</div>;
};

export default SalesTable;
