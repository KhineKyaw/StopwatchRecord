import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"

import TimeRecord from "../model"
import reducer from "./reducers"
import { updateTaskRecords, updateTaskList, selectTask } from "./actions"
import { radioFormData } from "../model"

const store = new createStore(reducer, applyMiddleware(thunk))

store.dispatch(updateTaskList(new radioFormData("01", "Python programming")))
store.dispatch(updateTaskList(new radioFormData("02", "Reading book")))
store.dispatch(updateTaskList(new radioFormData("03", "Body Training")))

// store.dispatch(selectTask(2))
export default store
