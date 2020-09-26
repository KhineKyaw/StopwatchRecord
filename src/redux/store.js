import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"

import TimeRecord from "../model"
import reducer from "./reducers"
import { updateTaskRecords, updateTaskList, selectTask } from "./actions"
import radioFormData from "../api/radioFormData"

const store = new createStore(reducer, applyMiddleware(thunk))

store.dispatch(updateTaskList(radioFormData("Python programming")))
store.dispatch(updateTaskList(radioFormData("Reading book")))
store.dispatch(updateTaskList(radioFormData("Body Training")))
store.dispatch(
  updateTaskList(radioFormData("Example long task, blah blah balh"))
)

// store.dispatch(selectTask(2))
export default store
