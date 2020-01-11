import React, { Component, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { actions } from "../../redux";
import "react-datepicker/dist/react-datepicker.css";
import { CheckMark } from "../Icons/checkmark";
import "./NewPart.css";

const NewPart = props => {
  const [input, handleUpdate] = useState("");
  const [color, changeFunc] = useState("(233, 53, 53)");
  const { handleClick, newInput } = props;
  const { addPiece } = actions;
  const dispatch = useDispatch();

  useEffect(() => {
    const colorSelectors = document.getElementsByClassName("color-picker");
    ReactDOM.render(<CheckMark />, colorSelectors[0]);
  });

  const changeColor = (event, color) => {
    event.preventDefault();
    const colorSelectors = document.getElementsByClassName("color-picker");
    const { target } = event;
    color = target.getAttribute("value");

    for (let i = 0; i < colorSelectors.length; i++) {
      if (target === colorSelectors[i]) {
        ReactDOM.render(<CheckMark></CheckMark>, colorSelectors[i]);
      } else {
        ReactDOM.unmountComponentAtNode(colorSelectors[i]);
      }
    }

    return color;
  };

  const handleSubmit = (
    event,
    dispatchParam,
    actionParam,
    inputParam,
    colorParam
  ) => {
    event.preventDefault();
    dispatchParam(actionParam({ value: inputParam, color: colorParam }));
  };

  return (
    <div className="newpart-wrapper">
      <span>Add something!</span>
      <button
        className="exit-button"
        onClick={event => handleClick(event, newInput)}
      >
        X
      </button>
      <br />
      <form
        action=""
        onSubmit={e => handleSubmit(e, dispatch, addPiece, input, color)}
      >
        <label htmlFor="">What?</label>
        <input
          type="text"
          name="activity"
          value={input}
          onChange={event => handleUpdate((input = event.target.value))}
        />
        <br />
        <br />
        <label htmlFor="">Color</label>
        <br />
        <div className="color-picker-wrapper">
          <div
            className="color-picker red"
            onClick={event => changeFunc(changeColor(event, color))}
            name="red"
            value="(233, 53, 53)"
          ></div>
          <div
            className="color-picker orange"
            onClick={event => changeFunc(changeColor(event, color))}
            name="orange"
            value="(255, 187, 0)"
          ></div>
          <div
            className="color-picker green"
            onClick={event => changeFunc(changeColor(event, color))}
            name="green"
            value="(1, 192, 87)"
          ></div>
          <div
            className="color-picker blue"
            onClick={event => changeFunc(changeColor(event, color))}
            name="blue"
            value="(0, 162, 255)"
          ></div>
          <div
            className="color-picker purple"
            onClick={event => changeFunc(changeColor(event, color))}
            name="purple"
            value="(169, 43, 241)"
          ></div>
          <div
            className="color-picker black"
            onClick={event => changeFunc(changeColor(event, color))}
            name="black"
            value="(30, 30, 30)"
          ></div>
        </div>
        <button
          className="create-button"
          onSubmit={e => handleSubmit(e, dispatch, addPiece, input, color)}
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default NewPart;
