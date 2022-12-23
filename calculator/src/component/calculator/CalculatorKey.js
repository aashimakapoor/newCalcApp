
import React from "react";
import "./CalculatorKey.css";

function CalculatorKey({ className, onClick, keyValue }) {
  return (
    <button className={className} onClick={() => onClick(keyValue)}>
      {keyValue}
    </button>
  );
}

export default CalculatorKey;