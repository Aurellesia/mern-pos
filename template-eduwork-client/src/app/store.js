// (1) import module dari 'redux'
import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

// (2) import redux-thunk middleware
import thunk from "redux-thunk";
import authReducer from "./features/Auth/reducer";
import cartReducer from "./features/Cart/reducer";
import productReducer from "./features/Product/reducer";

// (3) buat composer enhancer untuk menghubungkan dengan Chrome DevTools Redux
// const composerEnhancer = window.__REDUX_DEVTOOLS_COMPOSE__ || compose;

// (4) gabung reducer
const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  cart: cartReducer,
});

// (5) buat store, dan gunakan composerEnhancer + middleware thunk
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

// (6) export store
export default store;
