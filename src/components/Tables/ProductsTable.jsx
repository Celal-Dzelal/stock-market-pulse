import React from "react";
import useEffectHook from "../../hook/useEffectHook";

const ProductsTable = () => {
  const { products } = useEffectHook();
  return (
    <div>
      {products &&
        products.map((product) =>
          product.categoryId ? (
            <div key={product._id}>
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
