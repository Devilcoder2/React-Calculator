import React, { useState } from "react";
import Display from "./Display";
import Button from "./Button";
import "./styles/Calculator.css";
import { evaluate, round } from "mathjs";

const Calculator = () => {
  const [inputValue, setInputValue] = useState("");
  const [answer, setAnswer] = useState("");

  const inputHandler = (event) => {
    if (answer === "Invalid Input!!") return;

    let val = event.target.innerText;

    if (val === "x2") val = "^2";
    else if (val === "x3") val = "^3";
    else if (val === "3√") val = "^(1÷3)";
    else if (val === "log") val = "log(";

    let str = inputValue + val;
    if (str.length > 14) return;

    if (answer !== "") {
      setInputValue(answer + val);
      setAnswer("");
    } else {
      setInputValue(str);
    }
  };

  const clearHander = () => {
    setInputValue("");
    setAnswer("");
  };

  const backSpaceHandler = () => {
    if (answer === "Invalid Input!!") {
      setInputValue("");
      setAnswer("");
      return;
    }

    setInputValue((preValue) => preValue.slice(0, -1));
  };

  const signChangeHandler = () => {
    if (answer === "Invalid Input!!") return;
    //! Shirf input ho
    else if (answer === "") {
      //! Starting mai minus

      if (inputValue.charAt(0) === "-") {
        const sign = "+";
        setInputValue((preValue) =>
          sign.concat(preValue.slice(1, preValue.length))
        );
      }

      //! Starting mai plus
      else if (inputValue.charAt(0) === "+") {
        const sign = "-";
        setInputValue((preValue) =>
          sign.concat(preValue.slice(1, preValue.length))
        );
      }

      //! Noting in the start
      else {
        const sign = "-";
        setInputValue((preValue) => sign.concat(preValue));
      }
    }

    //! Answer hai
    else if (answer !== "") {
      //! Starting mai minus
      if (answer.charAt(0) === "-") {
        const sign = "+";
        setInputValue(sign.concat(answer.slice(1, answer.length)));
      }

      //! Starting mai plus
      else if (answer.charAt(0) === "+") {
        const sign = "-";
        setInputValue(sign.concat(answer.slice(1, answer.length)));
      }

      //! Nothing in the start
      else {
        const sign = "-";
        setInputValue(sign.concat(answer));
      }
    }
  };

  const checkIsBracketBalanced = (expression) => {
    let stack = [];

    //! Traverse the whole expression
    for (let i = 0; i < expression.length; i++) {
      let x = expression[i];

      if (x === "(") {
        stack.push(x);
        continue;
      } else if (x === ")") {
        if (stack.length === 0) return false;
        stack.pop();
      }
    }

    return stack.length === 0;
  };

  const caculateHandler = () => {
    if (inputValue === "") return;

    let result = 0;

    let finalExpression = inputValue;

    finalExpression = finalExpression.replaceAll("x", "*");
    finalExpression = finalExpression.replaceAll("÷", "/");

    //! evaluate square root
    let noSqrt = inputValue.match(/√[0-9]+/gi);

    if (noSqrt !== null) {
      let evalSqrt = inputValue;
      for (let i = 0; i < noSqrt.length; i++) {
        evalSqrt = evalSqrt.replace(
          noSqrt[i],
          `sqrt(${noSqrt[i].substring(1)})`
        );
      }
      finalExpression = evalSqrt;
    }

    try {
      if (!checkIsBracketBalanced(finalExpression)) {
        const errorMessage = { message: "Brackets are not balanced!" };
        throw errorMessage;
      }
      result = evaluate(finalExpression);
    } catch (error) {
      result =
        error.message === "Brackets are not balanced!"
          ? "Brackets are not balanced!"
          : "Invalid Input!!"; //error.message;
    }

    isNaN(result) ? setAnswer(result) : setAnswer(round(result, 3));
  };

  return (
    <>
      <div className="container">
        <div className="main">
          <Display
            inputValue={inputValue}
            answer={answer}
            setInputValue={setInputValue}
          />
          <Button
            inputHandler={inputHandler}
            clearHander={clearHander}
            backSpaceHandler={backSpaceHandler}
            signChangeHandler={signChangeHandler}
            caculateHandler={caculateHandler}
          />
        </div>
      </div>
    </>
  );
};

export default Calculator;
