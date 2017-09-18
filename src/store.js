

import { createStore, applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';
import { sessionReducer } from "./reducers/sessionReducer";
let store = createStore(sessionReducer, applyMiddleware(thunk));
export default store;