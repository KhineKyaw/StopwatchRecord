import { MaterialIcons } from "@expo/vector-icons"
import React, { useRef, useState } from "react"
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Easing
} from "react-native"
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
  const [restarted, setRestarted] = useState(true)
  let timeMillisTemp = useRef(props.stopWatch.timeMillis)
  let timeGap = useRef(0)
  let prevMillis = useRef(0)
  let dateTime = useRef(0)

  const timeUpdateHandler = () => {
    const now = Date.now()
    const netMillis = now - dateTime.current
    dateTime.current = now

    timeMillisTemp.current = timeMillisTemp.current + netMillis
    props.updateStopwatch(timeMillisTemp.current)
  }

  const createTimeUpdater = () => {
    dateTime.current = Date.now()
    setTimeUpdaterId(setInterval(timeUpdateHandler, TIME_STEP))
    setRestarted(false)
  }

  const unmountTimeUpdater = () => {
    clearInterval(timeUpdaterId)
  }

  const resetStopWatch = () => {
    unmountTimeUpdater()
    setTimerRunning(false)
    setRestarted(true)
    watchZoomOut()
    props.clearStopwatch()
    timeMillisTemp.current = 0
    prevMillis.current = 0
  }

  const toggleStartStop = () => {
    setTimerRunning(state => !state)
    if (timerRunning) unmountTimeUpdater()
    else createTimeUpdater()
    toggleWatchAnimation()
  }

  const saveTaskRecord = () => {
    timeGap.current = props.stopWatch.timeMillis
    if (!restarted) {
      timeGap.current = timeGap.current - prevMillis.current
    }
    if (timeGap.current < 1000) return

    props.updateTaskRecords(
      new TimeRecord(
        Date.now().toString(32),
        props.taskList.selected.label || "Lap",
        parseTimeMillis(timeGap.current),
        timeGap.current
      )
    )
    prevMillis.current = props.stopWatch.timeMillis
  }

  // Stopwatch Animation.
  const watchScale = useState(new Animated.Value(0))[0]
  const runWatchScale = useState(new Animated.Value(0))[0]
  const animation_duration = 500

  const watchZoomIn = () => {
    Animated.timing(watchScale, {
      toValue: 1,
      duration: animation_duration,
      easing: Easing.elastic(1.8),
      useNativeDriver: true
    }).start()
  }

  const watchZoomOut = () => {
    Animated.timing(watchScale, {
      toValue: 0,
      duration: animation_duration,
      easing: Easing.elastic(1.8),
      useNativeDriver: true
    }).start()
  }

  const toggleWatchAnimation = () => {
    if (timerRunning) watchZoomOut()
    else watchZoomIn()
  }

  return (
    <View style={styles.container}>
      <View style={styles.watchWrapper}>
        <Animated.View
          style={{
            transform: [
              {
                scale: watchScale.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.9, 1]
                })
              }
            ]
          }}>
          <TouchableOpacity
            style={styles.watchContainer}
            activeOpacity={0.5}
            onPressIn={toggleStartStop}
            delayPressIn={0}>
            <RobotoText style={styles.timeText}>
              {parseTimeMillis(props.stopWatch.timeMillis)}
            </RobotoText>
          </TouchableOpacity>
        </Animated.View>
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
    borderRadius: dimensions.WATCH_DIM / 2,
    justifyContent: "center",
    alignItems: "center"
  },
  timeText: {
    fontFamily: "RobotoThin",
    fontSize: 52
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
