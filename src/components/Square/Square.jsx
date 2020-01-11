import React, { Component } from "react";
import "./Square.css";

class Square extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onMouseOver = event => {
    console.log(event);
  };

  render() {
    return <div className="square-wrapper">{this.props.children}</div>;
  }
}

export default Square;
