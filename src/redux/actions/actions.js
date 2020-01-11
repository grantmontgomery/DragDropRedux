const addPiece = object => {
  return {
    type: "ADD",
    payload: { color: object.color, value: object.value }
  };
};

//combined actions

const actions = { addPiece };

export default actions;
