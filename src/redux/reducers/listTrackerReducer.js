const listTrackerReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "MOVE":
      return state.filter(piece => piece.location === "list");
    case "REMOVE":
      return state.filter(piece => piece.id !== action.payload.id);
    default:
      return state;
  }
};

export default listTrackerReducer;
