import { Entypo, FontAwesome5 } from "@expo/vector-icons"
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
import { colors, dimensions, sizes } from "../constants"
import { toggleTaskRecord } from "../redux/actions"

const animation_time = 1000

const Footer = props => {
  const { showTaskRecords } = props.uiStates
  const [flatListRef, setFlatListRef] = useState()

  // Animations
  const initialValue = showTaskRecords ? 0 : 1
  const iconRot = useState(new Animated.Value(initialValue))[0]
  const indicatorScale = useState(new Animated.Value(0))[0]

  const toggleShowHide = () => {
    if (showTaskRecords) {
      hideIconAnimation()
      props.toggleTaskRecord()
    } else {
      showIconAnimation()
      props.toggleTaskRecord()
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
              translateY: iconRot.interpolate({
                inputRange: [0, 1],
                outputRange: [0, dimensions.FOOTER_HEIGHT * 0.78]
              })
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
            opacity: iconRot.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0]
            })
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
                {/* <RobotoText style={styles.emptyText}>NO RECORD</RobotoText> */}
                <FontAwesome5
                  name='carrot'
                  color={colors.light_transparent_soft}
                  size={sizes.carrot_icon}
                />
              </View>
            )}
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  )
}

const mapStateToProps = state => ({
  taskRecords: state.task_records.taskRecords,
  uiStates: state.ui_states
})

export default connect(mapStateToProps, { toggleTaskRecord })(Footer)

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
