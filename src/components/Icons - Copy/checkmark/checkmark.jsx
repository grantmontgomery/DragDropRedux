import React from "react";
import "./checkmark.css";

const CheckMark = () => {
  return (
    <svg
      height="14"
      id="check"
      viewBox="0 0 32 32"
      width="14"
      xmlns="http://www.w3.org/2000/svg"
      className="checkmark"
    >
      <path id="path" d="M1 14 L5 10 L13 18 L27 4 L31 8 L13 26 z" />
    </svg>
  );
};

export default CheckMark;
