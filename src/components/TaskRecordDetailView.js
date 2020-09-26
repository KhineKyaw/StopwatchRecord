import { AntDesign, MaterialIcons } from "@expo/vector-icons"
import React from "react"
import { View, StyleSheet } from "react-native"

import { colors } from "../constants"
import RobotoText from "./RobotoText"
import NativeFeedbackView from "../components/NativeFeedbackView"
import { FlatList } from "react-native-gesture-handler"
import TaskRow from "./TaskRow"
import TaskRecordDetailRow from "./TaskRecordDetailRow"

const TaskRecordDetailView = props => (
  <View style={styles.container}>
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <NativeFeedbackView style={styles.close}>
          <MaterialIcons name='sort' color={colors.accent} size={28} />
        </NativeFeedbackView>
        <RobotoText style={styles.title}>Records</RobotoText>
        <NativeFeedbackView style={styles.close} onPress={props.onCancel}>
          <AntDesign name='close' color={colors.accent} size={28} />
        </NativeFeedbackView>
      </View>
    </View>
    <View style={styles.footer}>
      <FlatList
        data={props.taskRecords}
        renderItem={itemprops => (
          <TaskRecordDetailRow
            {...itemprops}
            index={props.taskRecords.length - itemprops.index}
          />
        )}
      />
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15
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
    flex: 1
  }
})

export default TaskRecordDetailView
