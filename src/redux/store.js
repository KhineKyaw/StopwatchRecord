import { createStore } from "redux"
import AsyncStorage from "@react-native-community/async-storage"
import { persistStore, persistReducer } from "redux-persist"

import reducer from "./reducers"

const persistConfig = {
  key: "root",
  storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = new createStore(persistedReducer)
export const persistor = persistStore(store)

export default store
