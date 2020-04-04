import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import dataReducer from "../reducers/data";
import { persistStore, persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  storage
};

const rootReducer = combineReducers({
  data: dataReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  const persistor = persistStore(store);
  return { store, persistor };
};
