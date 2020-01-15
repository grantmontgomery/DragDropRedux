const addPiece = object => {
  return {
    type: "ADD",
    payload: {
      color: object.color,
      value: object.value,
      location: "list",
      id: object.id
    }
  };
};

//combined actions

const movePiece = object => {
  return {
    type: "MOVE",
    payload: {
      location: object.location
    }
  };
};

const actions = { addPiece, movePiece };

export default actions;
