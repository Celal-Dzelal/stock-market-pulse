import React from "react";

import useEffectHook from "../../hook/useEffectHook";

const PurchaseTable = () => {
  const { purchases } = useEffectHook();
  console.log(purchases);
  return <div>PurchaseTable</div>;
};

export default PurchaseTable;
