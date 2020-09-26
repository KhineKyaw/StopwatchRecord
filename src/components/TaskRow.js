import { AntDesign, MaterialIcons } from "@expo/vector-icons"
import React from "react"
import { StyleSheet, View, TouchableOpacity } from "react-native"
import { colors, dimensions, sizes } from "../constants"

import NativeFeedbackView from "./NativeFeedbackView"
import RobotoText from "./RobotoText"

const TaskRow = props => (
  <View style={styles.container}>
    <NativeFeedbackView
      style={styles.taskContent}
      viewStyle={styles.viewStyle}
      onPress={props.onSelect}>
      <RobotoText style={styles.taskTitle} numberOfLines={1}>
        {props.item.title}
      </RobotoText>
      <RobotoText style={styles.taskTime}>{props.item.time}</RobotoText>
    </NativeFeedbackView>
    <TouchableOpacity style={styles.edit} delayPressIn={0}>
      <MaterialIcons
        name='edit'
        color={colors.light_transparent}
        size={sizes.control_icon}
        size={20}
      />
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "row"
  },
  taskContent: {
    flex: 1,
    height: dimensions.TASK_RECORD_HEIGHT,
    backgroundColor: "transparent",
    flexDirection: "row",
    borderRadius: dimensions.TASK_RECORD_HEIGHT / 2
  },
  taskTitle: {
    flex: 1,
    marginEnd: 10
  },
  viewStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10
  },
  edit: {
    width: dimensions.TASK_RECORD_HEIGHT * 0.7,
    height: dimensions.TASK_RECORD_HEIGHT,
    justifyContent: "center",
    alignItems: "center"
  }
})

export default TaskRow
