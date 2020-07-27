import { createStore } from "redux";
import { rootReducer, Naomi } from "./reducers";

export const configureStore = () => {
    const store = createStore(rootReducer,Naomi);

  return store;
  };
  
  export default configureStore;