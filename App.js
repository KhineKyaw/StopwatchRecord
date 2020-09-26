import React from "react"
import { Provider } from "react-redux"
import { enableScreens } from "react-native-screens"

import StopwatchRecordApp from "./src/StopwatchRecordApp"
import store from "./src/redux/store"

enableScreens(true)

export default function App() {
  return (
    <Provider store={store}>
      <StopwatchRecordApp />
    </Provider>
  )
}
