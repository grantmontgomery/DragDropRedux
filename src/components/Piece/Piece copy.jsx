import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import "./Piece.css";

const POSITION = { x: 0, y: 0 };
const Piece = props => {
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
    },
    [state.origin]
  );

  const handleMouseUp = useCallback(
    ({ target }) => {
      setState(state => ({
        ...state,
        isDragging: false
      }));

      onDragEnd();
    },
    [onDragEnd]
  );

  useEffect(() => {
    if (state.isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);

      setState(state => ({ ...state, translation: { x: 0, y: 0 } }));
    }
  }, [state.isDragging, handleMouseMove, handleMouseUp]);

  const styles = useMemo(
    () => ({
      cursor: state.isDragging ? "-webkit-grabbing" : "-webkit-grab",
      transform: `translate(${state.translation.x}px, ${state.translation.y}px)`,
      transition: state.isDragging ? "none" : "transform 500ms",
      zIndex: state.isDragging ? 2 : 1,
      position: state.isDragging ? "absolute" : "relative"
    }),
    [state.isDragging, state.translation]
  );

  return (
    <div className="piece-wrapper" style={styles} onMouseDown={handleMouseDown}>
      {children}
    </div>
  );
};
export default Piece;
