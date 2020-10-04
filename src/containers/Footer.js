import { Entypo } from "@expo/vector-icons"
import React, { useEffect, useState } from "react"
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing
} from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { connect } from "react-redux"

import RobotoText from "../components/RobotoText"
import TaskRow from "../components/TaskRow"
import { colors, dimensions } from "../constants"

const animation_time = 1000

const Footer = props => {
  const [showTaskRecords, setShowTaskRecords] = useState(true)
  const [flatListRef, setFlatListRef] = useState()

  // Animations
  const listPos = useState(new Animated.Value(0))[0]
  const iconRot = useState(new Animated.Value(0))[0]
  const indicatorScale = useState(new Animated.Value(0))[0]
  const [taskRecordsOpacity, _] = useState(new Animated.Value(1))

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
      easing: Easing.cubic
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
      easing: Easing.cubic
    }).start()
  }

  //Task length indicator
  const indicatorAnimation = callback => {
    Animated.timing(indicatorScale, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.elastic(1.6)
    }).start(callback)
  }

  const indicatorScaleDown = () => {
    Animated.timing(indicatorScale, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.elastic(1.6)
    }).start()
  }

  useEffect(() => {
    if (flatListRef) flatListRef.scrollToIndex({ index: 0 })
    indicatorAnimation(indicatorScaleDown)
  }, [props.taskRecords])

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
                opacity: iconRot,
                transform: [
                  {
                    scale: indicatorScale.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.46]
                    })
                  },
                  {
                    rotate: indicatorScale.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0deg", "90deg"]
                    })
                  }
                ]
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
                ref={ref => setFlatListRef(ref)}
                getItemLayout={(data, index) => ({
                  length: dimensions.TASK_RECORD_HEIGHT,
                  offset: dimensions.TASK_RECORD_HEIGHT * index,
                  index
                })}
                style={styles.flatList}
                data={props.taskRecords}
                renderItem={itemprops => (
                  <TaskRow
                    {...itemprops}
                    index={props.taskRecords.length - itemprops.index}
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
