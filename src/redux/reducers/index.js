import pieceTrackerReducer from "./pieceTrackerReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({ pieceTrackerReducer });

export default allReducers;
