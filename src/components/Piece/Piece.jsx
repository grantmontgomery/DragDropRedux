import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import "./Piece.css";

const Piece = props => {
  const { value, color } = props;

  const [state, setState] = useState({
    isDragging: false,
    isMoving: false,
    originalX: 0,
    originalY: 0,
    translateX: 0,
    translateY: 0,
    lastTranslateY: 0,
    lastTranslateX: 0,
    draggingElement: null,
    droppableElement: null
  });

  const handleMouseMove = ({ clientX, clientY }) => {
    const { isDragging } = state;
    const { draggingElement } = state;
    if (isDragging) {
      draggingElement.hidden = true;
      const elemBelow = document.elementFromPoint(clientX, clientY);
      draggingElement.hidden = false;
      setState(state => ({
        ...state,
        droppableElement: elemBelow,
        translateX: clientX + state.lastTranslateX - state.originalX,
        translateY: clientY + state.lastTranslateY - state.originalY
      }));
    }
  };

  const handleMouseUp = ({ clientX, clientY }) => {
    const { droppableElement, draggingElement } = state;
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
    if (
      droppableElement.className !== "square-wrapper" ||
      droppableElement === null
    ) {
      const list = document.getElementById("list-wrapper");
      list.append(draggingElement);
    } else {
      droppableElement.append(draggingElement);
    }
    setState({
      isDragging: false,
      isMoving: false,
      originalX: 0,
      originalY: 0,
      translateX: 0,
      translateY: 0,
      lastTranslateY: 0,
      lastTranslateX: 0,
      draggingElement: null,
      droppableElement: null
    });
  };

  useEffect(() => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  });

  const handleMouseDown = ({ clientX, clientY }) => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    setState(state => ({
      ...state,
      isDragging: true,
      originalX: clientX,
      originalY: clientY
    }));
  };

  const isDragging = () => {
    const { isDragging, translateX, translateY, isMoving } = state;
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
  };

  return (
    <div
      className="piece-wrapper"
      value={value}
      onMouseDown={handleMouseDown}
      style={isDragging()}
    ></div>
  );
};
// const Piece = props => {
//   let [isdragging, changeDragging] = useState(false);
//   let [isMoving, changeMoving] = useState(false);
//   let [originalX, changeOrigX] = useState(0);
//   let [originalY, changeOrigY] = useState(0);
//   let [translateX, changeTransX] = useState(0);
//   let [translateY, changeTransY] = useState(0);
//   let [lastTranslateX, changeLastTransX] = useState(0);
//   let [lastTranlsateY, changeLastTransY] = useState(0);
//   let [draggingElement, setDraggingElem] = useState(null);
//   let [droppableElement, setDroppable] = useState(null);

//   useEffect(() => {
//     window.removeEventListener("mousemove", this.handleMouseMove);
//     window.removeEventListener("mouseup", this.handleMouseUp);
//   });

//   // isDragging: true,
//   //     originalX: clientX,
//   //     originalY: clientY,
//   //     draggingElement: target

//   const handleMouseDown = ({ event, clientX, clientY }, isDragging,) => {
//     window.addEventListener("mousemove", this.handleMouseMove);
//     window.addEventListener("mouseup", this.handleMouseUp);
//   };

//   return (
//     <div
//       className="piece-wrapper"
//       value={value}
//       onMouseDown={this.handleMouseDown}
//       style={this.isDragging(this.state)}
//     ></div>
//   );
// };

// class Piece extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isDragging: false,
//       isMoving: false,
//       originalX: 0,
//       originalY: 0,
//       translateX: 0,
//       translateY: 0,
//       lastTranslateX: 0,
//       lastTranslateY: 0,
//       draggingElement: null,
//       droppable: null
//     };
//   }

//   componentWillUnmount() {
//     window.removeEventListener("mousemove", handleMouseMove);
//     window.removeEventListener("mouseup", handleMouseUp);
//   }

//   handleMouseDown = ({ target, clientX, clientY }) => {
//     window.addEventListener("mousemove", handleMouseMove);
//     window.addEventListener("mouseup", handleMouseUp);
//     this.setState({
//       isDragging: true,
//       originalX: clientX,
//       originalY: clientY,
//       draggingElement: target
//     });
//   };

//   handleMouseMove = ({ clientX, clientY }) => {
//     const { isDragging } = this.state;
//     const { draggingElement } = this.state;

//     if (isDragging) {
//       draggingElement.hidden = true;
//       const elemBelow = document.elementFromPoint(clientX, clientY);
//       draggingElement.hidden = false;
//       this.setState(prevState => ({
//         droppable: elemBelow,
//         translateX: clientX + prevState.lastTranslateX - prevState.originalX,
//         translateY: clientY + prevState.lastTranslateY - prevState.originalY
//       }));
//     }
//   };

//   handleMouseUp = () => {
//     const { droppable, draggingElement } = this.state;
//     const pieces = useSelector(state => state.pieceTrackerReducer);
//     window.removeEventListener("mousemove", this.handleMouseMove);
//     window.removeEventListener("mouseup", this.handleMouseUp);
//     if (droppable.className !== "square-wrapper" || droppable === null) {
//       const list = document.getElementById("list-wrapper");
//       list.append(draggingElement);
//     } else {
//       for (let i = 0; i < pieces.length; i++) {
//         if (draggingElement === pieces[i]) {
//           droppable.className === "square-wrapper"
//             ? (pieces[i]["location"] = "grid")
//             : (pieces[i]["location"] = "list");
//         }
//       }
//       droppable.append(draggingElement);
//     }
//     this.setState({
//       translateX: 0,
//       isMoving: false,
//       translateY: 0,
//       originalX: 0,
//       originalY: 0,
//       lastTranslateX: 0,
//       lastTranslateY: 0,
//       isDragging: false,
//       draggingElement: null,
//       droppable: null
//     });
//   };

//   isDragging({ isDragging, translateX, isMoving, translateY }) {
//     const { color } = this.props;
//     if (isDragging) {
//       return {
//         transform: `translate(${translateX}px, ${translateY}px)`,
//         cursor: "grabbing",
//         position: `${isMoving ? "absolute" : "relative"}`,
//         zIndex: 1000,
//         transition: "none",
//         boxShadow: "0 3px 6px 1px rgba(50, 50, 50, 0.5)",
//         background: `rgb${color}`
//       };
//     } else {
//       return {
//         transform: "translate(0, 0)",
//         position: "relative",
//         cursor: "grab",
//         zIndex: 1,
//         transition: "transform 500ms",
//         background: `rgb${color}`
//       };
//     }
//   }

//   render() {
//     const { value } = this.props;
//     console.log(this.props);
//     return (
//       <div
//         className="piece-wrapper"
//         value={value}
//         onMouseDown={this.handleMouseDown}
//         style={isDragging(this.state)}
//       ></div>
//     );
//   }
// }

export default Piece;
