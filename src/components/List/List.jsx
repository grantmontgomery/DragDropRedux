import React, { Component, useState } from "react";
import { Piece } from "../Piece";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { NewPart } from "../NewPart";
import { SMSSender } from "../SMSSender";
import { useSelector } from "react-redux";
import "./List.css";

const List = props => {
  const [newInput, renderInput] = useState(false);
  const [SMS, renderSMS] = useState(false);
  const pieces = useSelector(state => state.listTrackerReducer);

  // const handleClick = (event, newInput, SMS) => {
  //   event.preventDefault();
  //   newInput ? (newInput = false) : (newInput = true);
  //   return newInput;
  // };

  const handleClick = (event, state) => {
    event.preventDefault();

    state ? (state = false) : (state = true);
    return state;
  };

  const renderSMS = SMS => {
    if (SMS) {
    }
  };
  const renderNewInput = state => {
    if (state) {
      return (
        <CSSTransition key="1" timeout={300} classNames="newpart-transition">
          <NewPart
            key="1"
            onClick={event => handleChange(renderInput(event, newInput))}
            newInput={state}
          ></NewPart>
        </CSSTransition>
      );
    } else {
      return;
    }
  };

  console.log(state);

  return (
    <div id="list-wrapper">
      <div className="list-title">
        <span>Items</span>
        {/* <button onClick={event => handleChange(handleClick(event, newInput))}>
          +
        </button> */}
        <button onClick={event => renderInput(handleClick(event, newInput))}>
          +
        </button>
        <button onClick={event => renderSMS(handleClick(event, SMS))}>
          Send Schedule to Phone
        </button>
      </div>
      <TransitionGroup>{renderNewInput(newInput)}</TransitionGroup>
      {pieces.map(piece => (
        <Piece
          key={piece.id}
          id={piece.id}
          color={piece.color}
          value={piece.value}
        ></Piece>
      ))}
    </div>
  );
};

export default List;
