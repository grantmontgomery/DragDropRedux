const addPiece = object => {
  return {
    type: "ADD",
    payload: object
  };
};

//combined actions

const actions = { addPiece };

export default actions;
