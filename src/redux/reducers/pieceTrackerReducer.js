const pieceTrackerReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    default:
      return state;
  }
};

export default pieceTrackerReducer;

// const pieceTrackerReducer = (state = [], action) => {
//   switch (action.type) {
//     case "ADD":
//       return [...state, action.payload];
//     case "LIST":
//       return state.filter(piece => piece.)
//     default:
//       return state;
//   }
// };

// export default pieceTrackerReducer;
