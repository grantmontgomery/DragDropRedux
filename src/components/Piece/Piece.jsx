import React, { Component } from "react";
import "./Piece.css";

class Piece extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDragging: false,
      isMoving: false,
      originalX: 0,
      originalY: 0,
      translateX: 0,
      translateY: 0,
      lastTranslateX: 0,
      lastTranslateY: 0,
      draggingElement: null,
      droppable: null
    };
  }

  componentWillUnmount() {
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);
  }

  handleMouseDown = ({ target, clientX, clientY }) => {
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseup", this.handleMouseUp);
    target.hidden = true;
    const elemBelow = document.elementFromPoint(clientX, clientY);
    target.hidden = false;

    this.setState({
      isDragging: true,
      originalX: clientX,
      originalY: clientY,
      draggingElement: target,
      droppable: elemBelow
    });
  };

  handleMouseMove = ({ clientX, clientY }) => {
    const { isDragging } = this.state;
    const { draggingElement } = this.state;

    if (isDragging) {
      draggingElement.hidden = true;
      const elemBelow = document.elementFromPoint(clientX, clientY);
      draggingElement.hidden = false;
      this.setState(prevState => ({
        droppable: elemBelow,
        translateX: clientX + prevState.lastTranslateX - prevState.originalX,
        translateY: clientY + prevState.lastTranslateY - prevState.originalY
      }));
    }
  };

  handleMouseUp = () => {
    const { droppable, draggingElement } = this.state;
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);
    if (droppable.className !== "square-wrapper" || droppable === null) {
      const list = document.getElementById("list-wrapper");
      list.append(draggingElement);
    } else {
      droppable.append(draggingElement);
    }
    this.setState({
      translateX: 0,
      isMoving: false,
      translateY: 0,
      originalX: 0,
      originalY: 0,
      lastTranslateX: 0,
      lastTranslateY: 0,
      isDragging: false,
      draggingElement: null,
      droppable: null
    });
  };

  isDragging({ isDragging, translateX, isMoving, translateY }) {
    const { color } = this.props;
    if (isDragging) {
      return {
        transform: `translate(${translateX}px, ${translateY}px)`,
        cursor: "grabbing",
        position: `${isMoving ? "absolute" : "relative"}`,
        zIndex: 1000,
        transition: "none",
        boxShadow: "0 3px 6px 1px rgba(50, 50, 50, 0.5)",
        background: `rgb${color}`
      };
    } else {
      return {
        transform: "translate(0, 0)",
        position: "relative",
        cursor: "grab",
        zIndex: 1,
        transition: "transform 500ms",
        background: `rgb${color}`
      };
    }
  }

  render() {
    const { value } = this.props;
    return (
      <div
        className="piece-wrapper"
        value={value}
        onMouseDown={this.handleMouseDown}
        style={this.isDragging(this.state)}
      ></div>
    );
  }
}

export default Piece;
