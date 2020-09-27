import { Entypo } from "@expo/vector-icons"
import React, { useRef, useState } from "react"
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing
} from "react-native"
import { FlatList } from "react-native-gesture-handler"
import NativeFeedbackView from "../components/NativeFeedbackView"
import { connect } from "react-redux"

import RobotoText from "../components/RobotoText"
import TaskRow from "../components/TaskRow"
import { colors, dimensions } from "../constants"
import { color } from "react-native-reanimated"

const animation_time = 1000

const Footer = props => {
  const [showTaskRecords, setShowTaskRecords] = useState(true)

  const [listPos, setListPos] = useState(new Animated.Value(0))
  const [iconRot, setIconRot] = useState(new Animated.Value(0))
  const [taskRecordsOpacity, setTaskRecordsOpacity] = useState(
    new Animated.Value(1)
  )

  const toggleShowHide = () => {
    if (showTaskRecords) {
      taskRecordHideAnimation()
      hideIconAnimation()
    } else {
      taskRecordShowAnimation()
      showIconAnimation()
    }
  }

  const hideIconAnimation = () => {
    Animated.timing(iconRot, {
      toValue: 1,
      timing: animation_time,
      easing: Easing.elastic(0.9),
      useNativeDriver: true
    }).start()
  }

  const showIconAnimation = () => {
    Animated.timing(iconRot, {
      toValue: 0,
      timing: animation_time,
      easing: Easing.elastic(0.9),
      useNativeDriver: true
    }).start()
  }

  const taskRecordHideAnimation = () => {
    setShowTaskRecords(false)
    Animated.timing(listPos, {
      toValue: dimensions.FOOTER_HEIGHT * 0.78,
      timing: animation_time,
      easing: Easing.elastic(0.9),
      useNativeDriver: true
    }).start()

    Animated.timing(taskRecordsOpacity, {
      toValue: 0,
      timing: animation_time,
      useNativeDriver: true,
      Easing: Easing.cubic
    }).start()
  }

  const taskRecordShowAnimation = () => {
    setShowTaskRecords(true)
    Animated.timing(listPos, {
      toValue: 0,
      timing: animation_time,
      easing: Easing.elastic(0.85),
      useNativeDriver: true
    }).start()

    Animated.timing(taskRecordsOpacity, {
      toValue: 1,
      timing: animation_time,
      useNativeDriver: true,
      Easing: Easing.cubic
    }).start()
  }

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          transform: [
            {
              translateY: listPos
            }
          ]
        }}>
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.updownIconConatiner}
            delayPressIn={0}
            onPressIn={toggleShowHide}>
            <Animated.View
              style={{
                opacity: iconRot
              }}>
              <RobotoText style={styles.indicator}>
                {props.taskRecords.length}
              </RobotoText>
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.updownIconConatiner}
            delayPressIn={0}
            onPressIn={toggleShowHide}>
            <Animated.View
              style={{
                transform: [
                  {
                    rotate: iconRot.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0deg", "180deg"]
                    })
                  }
                ]
              }}>
              <Entypo name='chevron-thin-down' color={colors.light} size={20} />
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.updownIconConatiner}
            delayPressIn={0}
            onPressIn={!showTaskRecords ? props.onSelect : null}>
            <Animated.View
              style={{
                opacity: iconRot
              }}>
              <Entypo name='list' color={colors.light} size={20} />
            </Animated.View>
          </TouchableOpacity>
        </View>

        <Animated.View
          style={{
            opacity: taskRecordsOpacity
          }}>
          <View style={styles.taskListContainer}>
            {props.taskRecords.length > 0 ? (
              <FlatList
                style={styles.flatList}
                data={props.taskRecords}
                renderItem={itemprops => (
                  <TaskRow
                    {...itemprops}
                    onSelect={showTaskRecords ? props.onSelect : null}
                  />
                )}
                ListFooterComponent={
                  <View style={{ marginVertical: 5 }}></View>
                }
              />
            ) : (
              <View style={styles.emptyView}>
                <RobotoText style={styles.emptyText}>NO RECORD</RobotoText>
              </View>
            )}
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  )
}

const topContinerHeight = 30

const styles = StyleSheet.create({
  container: {
    height: dimensions.FOOTER_HEIGHT
  },
  topBar: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  updownIconConatiner: {
    width: "20%",
    height: topContinerHeight,
    alignItems: "center",
    justifyContent: "center"
  },
  taskListContainer: {
    height: dimensions.FOOTER_HEIGHT - topContinerHeight
  },
  title: {
    fontFamily: "RobotoBold",
    fontSize: 17
  },
  indicator: {
    fontSize: 12
  },
  indicatorContainer: {
    backgroundColor: "#ffffff60"
  },
  flatList: {
    paddingHorizontal: 20
  },
  emptyView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  emptyText: {
    color: colors.light_transparent_soft
  }
})

const mapStateToProps = state => ({
  taskRecords: state.task_records
})

export default connect(mapStateToProps)(Footer)
