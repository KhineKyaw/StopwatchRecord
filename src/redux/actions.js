import { colors } from "../constants"

export const UPDATE_STOPWATCH = "UPDATE_STOPWATCH"
export const CLEAR_STOPWATCH = "CLEAR_STOPWATCH"
export const UPDATE_TASKLIST = "UPDATE_TASKLIST"
export const CLEAR_TASKLIST = "CLEAR_TASKLIST"
export const REMOVE_TASK = "REMOVE_TASK"
export const UPDATE_TASKRECORDS = "UPDATE_TASKRECORDS"
export const CLEAR_TASKRECORDS = "CLEAR_TASKRECORDS"
export const REMOVE_TASKRECORD = "REMOVE_TASKRECORDS"

// stopwatch
export const updateStopwatch = update => ({
  type: UPDATE_STOPWATCH,
  payload: update
})

export const clearStopwatch = () => ({
  type: CLEAR_STOPWATCH
})

// task list
export const updateTaskList = update => ({
  type: UPDATE_TASKLIST,
  payload: update
})

export const clearTaskList = () => ({
  type: CLEAR_TASKLIST
})

export const removeTask = update => ({
  type: REMOVE_TASK,
  payload: update
})

// task records
export const updateTaskRecords = update => ({
  type: UPDATE_TASKRECORDS,
  payload: update
})

export const clearTaskRecords = () => ({
  type: CLEAR_TASKRECORDS
})

export const removeTaskRecord = update => ({
  type: REMOVE_TASKRECORD,
  payload: update
})
