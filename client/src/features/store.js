import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import cartRedux from "./cartRedux";
import userRedux from "./userRedux";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

const userPersistConfig = {
  key: "user",
  version: 1,
  storage,
};

const cartPersistConfig = {
  key: "cart",
  version: 2,
  storage,
};

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({ user: userRedux, cart: cartRedux });

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
