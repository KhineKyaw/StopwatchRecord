import { MaterialIcons } from "@expo/vector-icons"
import React, { useEffect, useRef, useState } from "react"
import { View, StyleSheet } from "react-native"
import { connect } from "react-redux"

import NativeFeedbackView from "../components/NativeFeedbackView"
import RobotoText from "../components/RobotoText"
import { colors, dimensions, sizes } from "../constants"
import parseTimeMillis from "../general/parseTimeMillis"
import {
  updateStopwatch,
  clearStopwatch,
  updateTaskRecords
} from "../redux/actions"
import { TimeRecord } from "../model"

const TIME_STEP = 1000

const Body = props => {
  const [timerRunning, setTimerRunning] = useState(false)
  const [timeUpdaterId, setTimeUpdaterId] = useState()
  let timeMillisTemp = useRef(0)

  const timeUpdateHandler = () => {
    timeMillisTemp.current = timeMillisTemp.current + TIME_STEP
    props.updateStopwatch(timeMillisTemp.current)
  }

  const createTimeUpdater = () => {
    setTimeUpdaterId(setInterval(timeUpdateHandler, TIME_STEP))
  }

  const unmountTimeUpdater = () => {
    clearInterval(timeUpdaterId)
  }

  const resetStopWatch = () => {
    unmountTimeUpdater()
    setTimerRunning(false)
    props.clearStopwatch()
    timeMillisTemp.current = 0
  }

  const toggleStartStop = () => {
    setTimerRunning(state => !state)
    if (timerRunning) unmountTimeUpdater()
    else createTimeUpdater()
  }

  const saveTaskRecord = () => {
    if (props.stopWatch.timeMillis < 1000) return
    props.updateTaskRecords(
      new TimeRecord(
        Date.now().toString(32),
        props.taskList.selected.label || "Lap",
        parseTimeMillis(props.stopWatch.timeMillis)
      )
    )
  }

  useEffect(() => {}, [timerRunning])

  return (
    <View style={styles.container}>
      <View style={styles.watchWrapper}>
        <NativeFeedbackView
          style={styles.watchContainer}
          onPress={toggleStartStop}>
          <RobotoText style={styles.timeText}>
            {parseTimeMillis(props.stopWatch.timeMillis)}
          </RobotoText>
        </NativeFeedbackView>
      </View>
      <View style={styles.controlContainer}>
        <NativeFeedbackView style={styles.controlIcon} onPress={resetStopWatch}>
          <MaterialIcons
            name='replay'
            color={colors.light}
            size={sizes.control_icon}
          />
        </NativeFeedbackView>
        <NativeFeedbackView style={styles.controlIcon} onPress={saveTaskRecord}>
          <MaterialIcons
            name='save'
            color={colors.light}
            size={sizes.control_icon}
          />
        </NativeFeedbackView>
      </View>
    </View>
  )
}

const mapStateToProps = state => ({
  stopWatch: state.stopwatch,
  taskList: state.task_list
})

export default connect(mapStateToProps, {
  updateStopwatch,
  clearStopwatch,
  updateTaskRecords
})(Body)

const styles = StyleSheet.create({
  container: {
    height: dimensions.BODY_HEIGHT,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  watchWrapper: {
    flex: 1,
    justifyContent: "center"
  },
  watchContainer: {
    backgroundColor: colors.watch_background,
    width: dimensions.WATCH_DIM,
    height: dimensions.WATCH_DIM,
    borderRadius: dimensions.WATCH_DIM / 2
  },
  timeText: {
    fontFamily: "RobotoThin",
    fontSize: 50
  },
  controlContainer: {
    flexDirection: "row",
    width: "100%",
    position: "absolute",
    justifyContent: "space-between",
    paddingHorizontal: 24
  },
  controlIcon: {
    width: dimensions.CONTROL_ICON_DIM,
    height: dimensions.CONTROL_ICON_DIM,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.light,
    borderRadius: dimensions.CONTROL_ICON_DIM / 2
  }
})
