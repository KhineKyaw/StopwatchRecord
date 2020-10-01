import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons
} from "@expo/vector-icons"
import React from "react"
import { View, StyleSheet } from "react-native"

import { colors } from "../constants"
import RobotoText from "./RobotoText"
import NativeFeedbackView from "../components/NativeFeedbackView"
import { FlatList } from "react-native-gesture-handler"
import TaskRecordDetailRow from "./TaskRecordDetailRow"
import parseTimeMillis from "../general/parseTimeMillis"

const TaskRecordDetailView = props => {
  const time_total = props.taskRecords.reduce(
    (sum, task) => sum + task.millis,
    0
  )

  return (
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
      <View style={styles.body}>
        {props.taskRecords.length > 0 ? (
          <FlatList
            data={props.taskRecords}
            renderItem={itemprops => (
              <TaskRecordDetailRow
                {...itemprops}
                onDelete={props.onDelete}
                index={props.taskRecords.length - itemprops.index}
              />
            )}
          />
        ) : (
          <View style={styles.emptyView}>
            <RobotoText style={styles.emptyText}>NO RECORD</RobotoText>
          </View>
        )}
      </View>
      <View style={styles.footer}>
        <MaterialCommunityIcons
          name='clock-check'
          color={colors.primary}
          size={28}
        />
        <View style={styles.sumTextContainer}>
          <RobotoText style={styles.sumText}>
            {parseTimeMillis(time_total)}
          </RobotoText>
        </View>
        <NativeFeedbackView
          style={styles.clearButton}
          onPress={props.onClearAll}>
          <RobotoText style={styles.clearBtnText}>CLEAR ALL</RobotoText>
        </NativeFeedbackView>
      </View>
    </View>
  )
}

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
  body: {
    flex: 1
  },
  footer: {
    height: "10%",
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  clearButton: {
    backgroundColor: "transparent",
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    width: 100
  },
  clearBtnText: {
    color: colors.primary,
    fontSize: 14,
    fontFamily: "Roboto"
  },
  emptyView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  emptyText: {
    color: colors.dark_transparent
  },
  sumTextContainer: {
    flex: 1,
    marginHorizontal: 10
  },
  sumText: {
    fontFamily: "Roboto",
    fontSize: 16,
    color: colors.primary,
    marginBottom: -5
  }
})

export default TaskRecordDetailView
