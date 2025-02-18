import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listStockData } from "../../features/stockSlice";

const PurchaseTable = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { purchases } = useSelector((state) => state.stock);

  useEffect(() => {
    if (token && !purchases) {
      dispatch(listStockData({ item: "purchases", token }));
    }
  }, [dispatch, token, !purchases]);

  console.log(purchases);
  return <div>PurchaseTable</div>;
};

export default PurchaseTable;
