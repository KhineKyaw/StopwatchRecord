export const UPDATE_STOPWATCH = "UPDATE_STOPWATCH"
export const CLEAR_STOPWATCH = "CLEAR_STOPWATCH"
export const UPDATE_TASKLIST = "UPDATE_TASKLIST"
export const CLEAR_TASKLIST = "CLEAR_TASKLIST"
export const REMOVE_TASK = "REMOVE_TASK"
export const UPDATE_TASKRECORDS = "UPDATE_TASKRECORDS"
export const CLEAR_TASKRECORDS = "CLEAR_TASKRECORDS"
export const REMOVE_TASKRECORD = "REMOVE_TASKRECORDS"
export const SELECT_TASK = "SELECT_TASK"
export const TOGGLE_THEME = "TOGGLE_THEME"
export const TOGGLE_RECORDLIST = "TOGGLE_RECORDLIST"
export const SORT_RECORDLIST = "SORT_RECORDLIST"
export const SORT_TASKLIST = "SORT_TASKLIST"

// theme
export const toggleTheme = () => ({
  type: TOGGLE_THEME
})

export const sortTaskRecords = () => ({
  type: SORT_RECORDLIST
})

export const sortTaskList = () => ({
  type: SORT_TASKLIST
})

export const toggleTaskRecord = () => ({
  type: TOGGLE_RECORDLIST
})

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

export const selectTask = update => ({
  type: SELECT_TASK,
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
