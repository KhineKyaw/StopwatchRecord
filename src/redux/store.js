import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"

import TimeRecord from "../model"
import reducer from "./reducers"
import { updateTaskRecords, updateTaskList, selectTask } from "./actions"
import radioFormData from "../api/radioFormData"

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

store.dispatch(updateTaskList(radioFormData("Python programming")))
store.dispatch(updateTaskList(radioFormData("Reading book")))
store.dispatch(updateTaskList(radioFormData("Body Training")))
store.dispatch(
  updateTaskList(radioFormData("Example long task, blah blah balh"))
)

// store.dispatch(selectTask(2))
export default store
