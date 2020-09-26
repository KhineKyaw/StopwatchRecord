import { AntDesign, MaterialIcons } from "@expo/vector-icons"
import React from "react"
import { View, StyleSheet, Text } from "react-native"

import { colors } from "../constants"
import RobotoText from "./RobotoText"
import NativeFeedbackView from "../components/NativeFeedbackView"
import RadioListView from "./RadioListView"
import RadioItem from "./RadioItem"

const TaskListView = props => {
  const { taskList } = props
  const selectedIndex = taskList.data.indexOf(taskList.selected)

  const selectAndClose = item => {
    props.onSelect(item)
    props.onCancel()
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <NativeFeedbackView style={styles.close}>
            <MaterialIcons name='sort' color={colors.accent} size={28} />
          </NativeFeedbackView>
          <RobotoText style={styles.title}>Tasks List</RobotoText>
          <NativeFeedbackView style={styles.close} onPress={props.onCancel}>
            <AntDesign name='close' color={colors.accent} size={28} />
          </NativeFeedbackView>
        </View>
      </View>
      <View style={styles.footer}>
        <RadioListView
          data={props.taskList.data}
          selectedIndex={selectedIndex}
          onSelect={selectAndClose}
          renderItem={RadioItem}
        />
      </View>
      <NativeFeedbackView style={styles.addButton}>
        <AntDesign name='plus' color={colors.light} size={30} />
      </NativeFeedbackView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: colors.light
  },
  close: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: "transparent"
  },
  header: {
    flexShrink: 1,
    alignItems: "center"
  },
  headerTop: {
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6
  },
  title: {
    fontSize: 18,
    textAlignVertical: "center",
    color: colors.dark
  },
  footer: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  addButton: {
    backgroundColor: colors.accent,
    position: "absolute",
    width: 58,
    height: 58,
    borderRadius: 58 / 2,
    bottom: 15,
    right: 15,
    elevation: 6
  }
})

export default TaskListView
