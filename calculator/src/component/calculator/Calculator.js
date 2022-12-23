import React, { useState, useEffect } from "react";
import CalculatorKey from "./CalculatorKey";
import "./Calculator.css";

function Calculator() {
  const [prevValue, setPrevValue] = useState("0");
  const [nextValue, setNextValue] = useState("0");
  const [op, setOp] = useState(null);

  const clearDisplay = () => {
    setNextValue("0");
    setPrevValue("0");
  };

  const changeSign = () => {
    setNextValue(nextValue * -1);
  };

  const percentage = () => {
    setNextValue(parseFloat(nextValue) / 100);
  };

  const insertDot = () => {
    if (!/\./.test(nextValue)) {
      setNextValue(nextValue + ".");
    } else {
      alert("Invalid Number");
    }
  };

  const CalculatorOperations = (op, firstValue, secondValue) => {
    switch(op) {
      case "/": return firstValue / secondValue;
      case "*": return firstValue * secondValue;
      case "+": return firstValue + secondValue;
      case "-": return firstValue - secondValue;
      case "=": return secondValue;
    }
  }

  const performOperation = () => {
    let result = CalculatorOperations(op,
      parseFloat(prevValue),
      parseFloat(nextValue)
    );

    result = Number.isInteger(result) ? result : result.toFixed(2);
    setOp(null);
    setNextValue(String(result));
    setPrevValue("");
  };

  const handleNumber = (number) => {
    setNextValue(nextValue === "0" ? String(number) : nextValue + number);
  };

  const handleKeyClick = (value) => {
    if (Number.isInteger(value)) {
      handleNumber(value);
    } else if (["/", "*", "+", "-", "="].includes(value)) {
      if (op === null) {
        setOp(value);
        setPrevValue(nextValue);
        setNextValue("");
      }
      if (prevValue && op && nextValue) {
        performOperation();
      }
    } else if (value === "c") {
      clearDisplay();
    } else if (value === "\xB1") {
      changeSign();
    } else if (value === ".") {
      insertDot();
    } else if (value === "%") {
      percentage();
    }
   };

  return (
    <div className="wrapper">
      <div className="app">
        <div className="calculator">
           <div className="calculator-display">
             <div className="result">{!!nextValue ? nextValue : op}</div>
           </div>
           <div className="calculator-keypad">
            <div className="input-keys">
              <div className="function-keys">
                <CalculatorKey className="calculator-key" keyValue={"c"} onClick={handleKeyClick} />
                <CalculatorKey className="calculator-key" keyValue={"\xB1"} onClick={handleKeyClick} />
                <CalculatorKey className="calculator-key" keyValue={"%"} onClick={handleKeyClick} />
              </div>
              <div className="number-keys">
                <CalculatorKey className="calculator-key" keyValue={9} onClick={handleKeyClick} />
                <CalculatorKey className="calculator-key" keyValue={8} onClick={handleKeyClick} />
                <CalculatorKey className="calculator-key" keyValue={7} onClick={handleKeyClick} />
                <CalculatorKey className="calculator-key" keyValue={6} onClick={handleKeyClick} />
                <CalculatorKey className="calculator-key" keyValue={5} onClick={handleKeyClick} />
                <CalculatorKey className="calculator-key" keyValue={4} onClick={handleKeyClick} />
                <CalculatorKey className="calculator-key" keyValue={3} onClick={handleKeyClick} />
                <CalculatorKey className="calculator-key" keyValue={2} onClick={handleKeyClick} />
                <CalculatorKey className="calculator-key" keyValue={1} onClick={handleKeyClick} />
                <CalculatorKey
                  className="calculator-key zero"
                  keyValue={0}
                  onClick={handleKeyClick}
                />
                <CalculatorKey
                  className="calculator-key dot"
                  keyValue={"."}
                  onClick={handleKeyClick}
                />
            </div>
          </div>
          <div className="operator-keys">
            <CalculatorKey className="calculator-key" keyValue={"+"} onClick={handleKeyClick} />
            <CalculatorKey className="calculator-key" keyValue={"-"} onClick={handleKeyClick} />
            <CalculatorKey className="calculator-key" keyValue={"*"} onClick={handleKeyClick} />
            <CalculatorKey className="calculator-key" keyValue={"/"} onClick={handleKeyClick} />
            <CalculatorKey className="calculator-key" keyValue={"="} onClick={handleKeyClick} />
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Calculator;
