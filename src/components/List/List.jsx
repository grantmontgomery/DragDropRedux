import React, { Component, useState } from "react";
import { Piece } from "../Piece";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { NewPart } from "../NewPart";
import { useSelector } from "react-redux";
import "./List.css";

const List = props => {
  const [newInput, handleChange] = useState(false);
  const pieces = useSelector(state => state.listTrackerReducer);

  const handleClick = (event, newInput) => {
    event.preventDefault();
    newInput ? (newInput = false) : (newInput = true);
    return newInput;
  };

  const renderNewInput = newInput => {
    if (newInput) {
      return (
        <CSSTransition key="1" timeout={300} classNames="newpart-transition">
          <NewPart
            key="1"
            handleClick={event => handleClick(event, newInput)}
            newInput={newInput}
          ></NewPart>
        </CSSTransition>
      );
    } else {
      return;
    }
  };

  console.log(pieces);

  return (
    <div id="list-wrapper">
      <div className="list-title">
        <span>Items</span>
        <button onClick={event => handleChange(handleClick(event, newInput))}>
          +
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
