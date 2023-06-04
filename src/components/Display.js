import React from "react";
import "./styles/Display.css";

const Display = (props) => {
  const changeHandler = (event) => {
    const re = /^[!%(-+\x2D-9^glox\xF7\u221A]+$/;

    if (event.target.value === "" || re.test(event.target.value)) {
      props.setInputValue(event.target.value);
    }
  };

  return (
    <>
      <div className="display">
        {props.answer === "" ? (
          <>
            <input
              type="text"
              placeholder="0"
              name="input"
              style={{ padding: "29px" }}
              className="input"
              value={props.inputValue}
              maxLength={12}
              autoComplete="off"
              onChange={changeHandler}
            />
          </>
        ) : (
          <>
            <input
              type="text"
              name="input"
              className="value"
              value={props.inputValue}
              placeholder="0"
              maxLength={12}
              disabled
            />
            <input
              type="text"
              name="value"
              className="input"
              value={props.answer}
              disabled
            />
          </>
        )}
      </div>
    </>
  );
};

export default Display;
