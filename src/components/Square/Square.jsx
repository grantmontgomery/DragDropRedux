import React, { Component } from "react";
import "./Square.css";

const Square = React.memo(props => {
  return <div className="square-wrapper">{props.children}</div>;
});

export default Square;
