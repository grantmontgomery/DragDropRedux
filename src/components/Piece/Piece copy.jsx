import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import "./Piece.css";

const POSITION = { x: 0, y: 0 };
const Piece = props => {
  const { color, value } = props;
  const [state, setState] = useState({
    isDragging: false,
    origin: POSITION,
    translation: POSITION
  });

  const handleMouseDown = useCallback(({ target, clientX, clientY }) => {
    target.hidden = true;
    const elemBelow = document.elementFromPoint(clientX, clientY);
    target.hidden = false;

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
      }
    },
    [state.origin, state.isDragging]
  );

  const handleMouseUp = useCallback(({ target }) => {
    target.hidden = true;
    const droppableElement = document.elementFromPoint(
      state.translation.x,
      state.translation.y
    );
    target.hidden = false;
    setState({ ...state, droppableElement });
    if (
      droppableElement.className !== "square-wrapper" ||
      droppableElement === null
    ) {
      const list = document.getElementById("list-wrapper");
      list.append(target);
    } else {
      state.droppableElement.append(target);
    }
    setState(state => ({
      ...state,
      droppableElement: null,
      isDragging: false
    }));
  }, []);

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
      transform: `translate(${state.translation.x}px, ${state.translation.y}px)`,
      // transition: state.isDragging ? "none" : "transform 500ms",
      zIndex: state.isDragging ? 1000 : 1,
      color: `${color}`
      // position: state.isDragging ? "absolute" : "relative"
    }),
    [state.isDragging, state.translation]
  );
  console.log(state.droppableElement);
  return (
    <div
      className="piece-wrapper"
      style={styles}
      onMouseDown={handleMouseDown}
    ></div>
  );
};
export default Piece;
