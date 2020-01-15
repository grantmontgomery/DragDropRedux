import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef
} from "react";
import { useSelector } from "react-redux";
import "./Piece.css";

const POSITION = { x: 0, y: 0 };
const Piece = props => {
  const renders = useRef(0);
  const { color, value } = props;
  const [state, setState] = useState({
    isDragging: false,
    origin: POSITION,
    translation: POSITION
  });
  const pieces = useSelector(state => state.pieceTrackerReducer);

  const handleMouseDown = useCallback(({ target, clientX, clientY }) => {
    target.hidden = true;
    const elemBelow = document.elementFromPoint(clientX, clientY);
    target.hidden = false;
    console.log("DRAG   START");
    console.log(elemBelow);
    setState(state => ({
      ...state,
      draggingElement: target,
      droppableElement: elemBelow,
      isDragging: true,
      origin: { x: clientX, y: clientY }
    }));
  }, []);

  const handleMouseMove = useCallback(
    ({ clientX, clientY, target }) => {
      if (state.isDragging) {
        target.hidden = true;
        const droppableElement = document.elementFromPoint(clientX, clientY);
        target.hidden = false;
        const translation = {
          x: clientX - state.origin.x,
          y: clientY - state.origin.y
        };
        setState(state => ({
          ...state,
          translation,
          droppableElement
        }));
      } else {
        setState(state => ({
          ...state,
          origin: POSITION,
          translation: POSITION,
          isDragging: false
        }));
      }
    },
    [state.origin, state.isDragging]
  );

  const appendToPlace = droppableElement => {
    if (
      droppableElement.className !== "square-wrapper" ||
      droppableElement === null
    ) {
      const list = document.getElementById("list-wrapper");
      console.log("appending to list");
      list.append(state.draggingElement);
    } else if (droppableElement.className === "square-wrapper") {
      droppableElement.append(state.draggingElement);

      console.log("appending to a square");
    } else {
      console.log("error sensing dropped element");
    }
    console.log(state.draggingElement);
    for (let i = 0; i < pieces.length; i++) {
      if (props.id === pieces[i].id) {
        if (droppableElement.className === "square-wrapper") {
          pieces[i].location = "grid";
        } else {
          pieces[i].location = "list";
        }
        console.log(pieces[i].location);
      }
    }
  };

  const handleMouseUp = useCallback(
    ({ clientX, clientY }) => {
      state.draggingElement.hidden = true;

      const droppableElement = document.elementFromPoint(clientX, clientY);
      state.draggingElement.hidden = false;

      appendToPlace(droppableElement);

      setState(state => ({
        ...state,
        isDragging: false
      }));
    },
    [state.isDragging]
  );

  useEffect(() => {
    if (state.isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      setState(state => ({
        ...state,
        origin: POSITION,
        translation: POSITION,
        isDragging: false
      }));
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [state.isDragging]);

  const styles = useMemo(
    () => ({
      cursor: state.isDragging ? "-webkit-grabbing" : "-webkit-grab",
      transform: state.isDragging
        ? `translate(${state.translation.x}px, ${state.translation.y}px) rotate(5deg)`
        : `translate(${state.translation.x}px, ${state.translation.y}px)`,
      zIndex: state.isDragging ? 1000 : 3,
      transition: "none",
      boxShadow: state.isDragging
        ? "0 3px 6px 1px rgba(50, 50, 50, 0.5)"
        : "none",
      background: `rgb${color}`
    }),
    [state.isDragging, state.translation]
  );
  return (
    <div
      className="piece-wrapper"
      style={styles}
      onMouseDown={handleMouseDown}
    ></div>
  );
};
export default Piece;
