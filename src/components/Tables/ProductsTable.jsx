import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listStockData } from "../../features/stockSlice";

const ProductsTable = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.stock);

  useEffect(() => {
    if (token && products.length === 0) {
      dispatch(listStockData({ item: "products", token }));
    }
  }, [dispatch, token, products.length]);

  console.log(products);

  return (
    <div>
      {products &&
        products.map((product) =>
          product.categoryId ? (
            <div key={product.categoryId._id}>
              <p>{product.categoryId.name}</p>
            </div>
          ) : (
            <div key={product._id}>No Category Available</div>
          )
        )}
    </div>
  );
};
export default ProductsTable;
