import { createStore, applyMiddleware } from "redux";
import { rootReducer, Naomi } from "./reducers";
import thunk from "redux-thunk";

export const configureStore = () => {
    const store = createStore(rootReducer,Naomi,applyMiddleware(thunk));
    return store;
  };
  
  export default configureStore;