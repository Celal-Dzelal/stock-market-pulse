import React from "react";
import useEffectHook from "../../hook/useEffectHook";

const SalesTable = () => {
  const { sales } = useEffectHook();

  console.log(sales);

  return <div>SalesTable</div>;
};

export default SalesTable;
