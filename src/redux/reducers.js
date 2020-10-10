import { step0 } from "react-native/Libraries/Animated/src/Easing"
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
  CLEAR_TASKLIST,
  TOGGLE_THEME,
  TOGGLE_RECORDLIST,
  SORT_RECORDLIST,
  SORT_TASKLIST
} from "./actions"

const themeReducer = (state = { darkTheme: false }, action) => {
  if (action.type === TOGGLE_THEME) {
    return { ...state, darkTheme: !state.darkTheme }
  } else return state
}

const uiStateReducer = (state = { showTaskRecords: true }, action) => {
  if (action.type === TOGGLE_RECORDLIST) {
    return { ...state, showTaskRecords: !state.showTaskRecords }
  } else return state
}

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
  selected: {},
  sorted: false
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
      return INIT_TASK
    case SORT_TASKLIST:
      return { ...state, sorted: !state.sorted }
    default:
      return state
  }
}

const INIT_TASK_RECORD = {
  taskRecords: [],
  sorted: false
}

const taskRecordsReducer = (state = INIT_TASK_RECORD, action) => {
  switch (action.type) {
    case UPDATE_TASKRECORDS:
      return { ...state, taskRecords: [action.payload, ...state.taskRecords] }
    case REMOVE_TASKRECORD:
      return {
        ...state,
        taskRecords: state.taskRecords.filter(
          task => task.id !== action.payload
        )
      }
    case CLEAR_TASKRECORDS:
      return INIT_TASK_RECORD
    case SORT_RECORDLIST:
      return { ...state, sorted: !state.sorted }
    default:
      return state
  }
}

const reducer = combineReducers({
  stopwatch: stopWatchReducer,
  task_list: taskListReducer,
  task_records: taskRecordsReducer,
  theme: themeReducer,
  ui_states: uiStateReducer
})

export default reducer
