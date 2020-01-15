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

const listToGrid = id => {
  return {
    type: "REMOVE",
    payload: {
      id: id
    }
  };
};

const actions = { addPiece, movePiece, listToGrid };

export default actions;
