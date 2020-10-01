import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import AsyncStorage from "@react-native-community/async-storage"
import { persistStore, persistReducer } from "redux-persist"

import reducer from "./reducers"

const persistConfig = {
  key: "root",
  storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = new createStore(persistedReducer, applyMiddleware(thunk))
export const persistor = persistStore(store)

export default store
