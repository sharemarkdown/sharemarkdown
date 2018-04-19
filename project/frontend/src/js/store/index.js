// src/js/store/index.js
/* global window */
import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {routerMiddleware } from 'react-router-redux';
import rootReducer from "../reducers/index";
import createHistory from 'history/createHashHistory';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const loggerMiddleware = createLogger();
const history = createHistory();
const middleware = routerMiddleware(history)
const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = createStore(
  persistedReducer,
  undefined,
  compose(
    applyMiddleware(middleware, thunkMiddleware, loggerMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

let persistor = persistStore(store)

export const store_={
  store,
  persistor,
  history
};

