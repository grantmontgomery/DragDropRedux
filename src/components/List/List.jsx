import React, { Component, useState } from "react";
import { Piece } from "../Piece";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { NewPart } from "../NewPart";
import { useSelector } from "react-redux";
import "./List.css";

const List = props => {
  const [newInput, handleChange] = useState(false);
  const pieces = useSelector(state => state.pieceTrackerReducer);

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
      {pieces
        .filter(piece => piece.location === "list")
        .map(piece => (
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

// class List extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       input: false,
//       pieces: [],
//       newPieceValue: ""
//     };
//   }

//   handleSubmit = (event, newPiece) => {
//     const { pieces } = this.state;
//     event.preventDefault();
//     this.setState({ pieces: [...pieces, newPiece], newPieceValue: "" });
//   };

//   handleUpdate = event => {
//     const { target } = event;
//     this.setState({ newPieceValue: target.value });
//   };

//   // applyTransitions = () => {
//   //   const {pieces} = this.state
//   //   return pieces.map(piece => (
//   //     <CSSTransition key={Math.floor(Math.random() * Math.floor(100))} timeout={300} classNames="slide-transition">
//   //       <li key={todo.id}>
//   //         <ToDo value={todo.value} id={todo.id} deleteTodo={this.deleteTodo} />
//   //       </li>
//   //     </CSSTransition>
//   //   ));
//   // };

//   renderNewInput = () => {
//     const { input, newPieceValue } = this.state;
//     if (input) {
//       return (
//         <CSSTransition key="1" timeout={300} classNames="newpart-transition">
//           <NewPart
//             key="1"
//             newPieceValue={newPieceValue}
//             handleUpdate={this.handleUpdate}
//             handleSubmit={this.handleSubmit}
//             handleClick={this.handleClick}
//           ></NewPart>
//         </CSSTransition>
//       );
//     } else {
//       return;
//     }
//   };

//   render() {
//     const { pieces } = this.state;
//     return (
//       <div id="list-wrapper">
//         <div className="list-title">
//           <span>Items</span>
//           <button onClick={this.handleClick}>+</button>
//         </div>
//         <TransitionGroup>{this.renderNewInput()}</TransitionGroup>
//         {pieces.map(piece => (
//           <Piece
//             key={Math.floor(Math.random() * Math.floor(100))}
//             color={piece.color}
//             value={piece.newPieceValue}
//           ></Piece>
//         ))}
//       </div>
//     );
//   }
// }

export default List;
