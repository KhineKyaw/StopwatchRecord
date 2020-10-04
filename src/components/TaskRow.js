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
      <View style={styles.edit} delayPressIn={0}>
        <RobotoText numberOfLines={1} ellipsizeMode='middle'>
          {props.index}
        </RobotoText>
      </View>
      <RobotoText style={styles.taskTitle} numberOfLines={1}>
        {props.item.title}
      </RobotoText>
      <RobotoText style={styles.taskTime}>{props.item.time}</RobotoText>
    </NativeFeedbackView>
  </View>
)

const index_dim = dimensions.TASK_RECORD_HEIGHT * 0.7

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center"
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
    width: index_dim,
    height: index_dim,
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.light_transparent,
    borderWidth: 1,
    borderRadius: index_dim / 2,
    marginEnd: 10
    // backgroundColor: "red"
  }
})

export default TaskRow
