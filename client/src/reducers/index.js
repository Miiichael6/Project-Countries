import { combineReducers } from "redux";
import reducerMain from "./reducerMain";


const rootReducer = combineReducers({
  reducerMain: reducerMain,
})

export default rootReducer
