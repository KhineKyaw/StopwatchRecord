import { combineReducers } from "redux"

import {
  UPDATE_STOPWATCH,
  CLEAR_STOPWATCH,
  UPDATE_TASKLIST,
  UPDATE_TASKRECORDS,
  CLEAR_TASKRECORDS,
  REMOVE_TASK,
  REMOVE_TASKRECORD,
  CLEAR_TASKLIST
} from "./actions"

const stopWatchReducer = (state = 0, action) => {
  switch (action.type) {
    case UPDATE_STOPWATCH:
      return action.payload
    case CLEAR_STOPWATCH:
      return 0
    default:
      return state
  }
}

const taskListReducer = (state = [], action) => {
  switch (action.type) {
    case UPDATE_TASKLIST:
      return [...state, action.payload]
    case REMOVE_TASK:
      return [...state].filter(task => task.id !== payload)
    case CLEAR_TASKLIST:
      return []
    default:
      return state
  }
}

const taskRecordsReducer = (state = [], action) => {
  switch (action.type) {
    case UPDATE_TASKRECORDS:
      return [...state, action.payload]
    case REMOVE_TASKRECORD:
      return [...state].filter(task => task.id !== payload)
    case CLEAR_TASKRECORDS:
      return []
    default:
      return state
  }
}

const reducer = combineReducers({
  stopwatch: stopWatchReducer,
  task_list: taskListReducer,
  task_records: taskRecordsReducer
})

export default reducer
