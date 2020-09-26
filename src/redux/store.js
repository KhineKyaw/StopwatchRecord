import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"

import TimeRecord from "../model"
import reducer from "./reducers"
import { updateTaskRecords, updateTaskList } from "./actions"

const store = new createStore(reducer, applyMiddleware(thunk))

store.dispatch(
  updateTaskRecords(new TimeRecord("001", "Python programming", "01:12:34"))
)
store.dispatch(
  updateTaskRecords(new TimeRecord("002", "Reading book", "00:32:34"))
)
store.dispatch(
  updateTaskRecords(new TimeRecord("003", "Body Training", "00:45:34"))
)
store.dispatch(
  updateTaskRecords(
    new TimeRecord("004", "Example long task, blah blah balh", "01:12:34")
  )
)
store.dispatch(
  updateTaskRecords(new TimeRecord("005", "Python programming", "01:12:34"))
)
store.dispatch(
  updateTaskRecords(new TimeRecord("006", "Reading book", "00:32:34"))
)
store.dispatch(
  updateTaskRecords(new TimeRecord("007", "Body Training", "00:45:34"))
)

store.dispatch(updateTaskList("Python"))

export default store
