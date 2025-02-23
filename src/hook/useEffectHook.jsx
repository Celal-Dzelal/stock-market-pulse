import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createStockData, listStockData } from "../features/stockSlice";

const useEffectHook = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { firms, brands, products, purchases, sales } = useSelector(
    (state) => state.stock
  );

  useEffect(() => {
    if (token) {
      if (!firms.length) {
        dispatch(listStockData({ item: "firms", token }));
      }
      if (!brands.length) {
        dispatch(listStockData({ item: "brands", token }));
      }
      if (!products.length) {
        dispatch(listStockData({ item: "products", token }));
      }
      if (!purchases.length) {
        dispatch(listStockData({ item: "purchases", token }));
      }
      if (!sales.length) {
        dispatch(listStockData({ item: "sales", token }));
      }
    }
  }, [
    token,
    dispatch,
    firms.length,
    brands.length,
    products.length,
    purchases.length,
    sales.length,
  ]);

  return { firms, brands, products, purchases, sales };
};

export default useEffectHook;
