const listTrackerReducer = (
  state = [
    { color: "(233, 53, 53)", value: "cool bar", location: "list", id: 0.19 },
    {
      color: "(0, 162, 255)",
      value: "rock concert",
      location: "list",
      id: 0.24
    }
  ],
  action
) => {
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
