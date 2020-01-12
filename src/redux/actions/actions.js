const addPiece = object => {
  return {
    type: "ADD",
    payload: { color: object.color, value: object.value, location: "list" }
  };
};

//combined actions

const actions = { addPiece };

export default actions;
