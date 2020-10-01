import React from "react"
import { enableScreens } from "react-native-screens"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

import StopwatchRecordApp from "./src/StopwatchRecordApp"
import store, { persistor } from "./src/redux/store"

enableScreens(true)

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StopwatchRecordApp />
      </PersistGate>
    </Provider>
  )
}
