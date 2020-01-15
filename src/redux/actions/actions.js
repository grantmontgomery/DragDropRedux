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

const actions = { addPiece };

export default actions;
