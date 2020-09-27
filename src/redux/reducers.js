import { combineReducers } from "redux"

import {
  UPDATE_STOPWATCH,
  CLEAR_STOPWATCH,
  UPDATE_TASKLIST,
  SELECT_TASK,
  UPDATE_TASKRECORDS,
  CLEAR_TASKRECORDS,
  REMOVE_TASK,
  REMOVE_TASKRECORD,
  CLEAR_TASKLIST
} from "./actions"

const INIT_STOPWATCH = {
  timeMillis: 0
}

const stopWatchReducer = (state = INIT_STOPWATCH, action) => {
  switch (action.type) {
    case UPDATE_STOPWATCH:
      return { ...state, timeMillis: action.payload }
    case CLEAR_STOPWATCH:
      return INIT_STOPWATCH
    default:
      return state
  }
}

const INIT_TASK = {
  data: [],
  selected: {}
}

const taskListReducer = (state = INIT_TASK, action) => {
  switch (action.type) {
    case UPDATE_TASKLIST:
      return { ...state, data: [action.payload, ...state.data] }
    case REMOVE_TASK:
      return {
        ...state,
        data: state.data.filter(task => task.id !== action.payload)
      }
    case SELECT_TASK:
      return { ...state, selected: action.payload }
    case CLEAR_TASKLIST:
      return {}
    default:
      return state
  }
}

const taskRecordsReducer = (state = [], action) => {
  switch (action.type) {
    case UPDATE_TASKRECORDS:
      return [action.payload, ...state]
    case REMOVE_TASKRECORD:
      return [...state].filter(task => task.id !== action.payload)
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
