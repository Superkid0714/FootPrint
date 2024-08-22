import React from "react";

const Button = (props) => {
  return (
    <button type="submit" className="button">
      {props.text}
    </button>
  );
};

export default Button;
