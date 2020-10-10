import { AntDesign, MaterialIcons } from "@expo/vector-icons"
import React, { useState } from "react"
import { View, StyleSheet, Animated, Easing } from "react-native"

import { colors, dimensions, sizes } from "../constants"
import RobotoText from "./RobotoText"
import NativeFeedbackView from "../components/NativeFeedbackView"
import RadioListView from "./RadioListView"
import RadioItem from "./RadioItem"
import Input from "./Input"
import { radioFormData } from "../model"

const ANIMATED_TIMING = 500
const EASING_BEZIER = Easing.bezier(0.42, 0.01, 0.61, 1)

// compare two contacts for alphabetizing
const compareLabel = (item1, item2) => (item1.label > item2.label ? 1 : -1)

const TaskListView = props => {
  const [inputValue, setInputValue] = useState()
  const [addIconAnival, _] = useState(new Animated.Value(1))
  const [showInput, setShowInput] = useState(false)
  const [inputRef, setinputRef] = useState(false)

  const { taskList } = props
  let data = [...taskList.data]
  if (data && props.sorted) data = data.sort(compareLabel)
  const selectedIndex = data.findIndex(task => task.id === taskList.selected.id)
  const sort_icon = props.sorted ? "sort-by-alpha" : "sort"

  const { darkTheme } = props.theme
  let dark_style = {}
  let dark_text = {}

  if (darkTheme) {
    dark_style = { backgroundColor: colors.dark_theme_modal }
    dark_text = { color: colors.light }
  }

  const sortTasksAlpha = () => {
    props.onSort()
  }

  const inputValueHandler = text => {
    setInputValue(text)
  }

  const taskAddHandler = () => {
    if (inputValue && inputValue.trim()) {
      const task = new radioFormData(Date.now().toString(32), inputValue)
      props.onTaskAdd(task)
      if (data.length === 0) {
        props.onSelect(task)
      }
    }
    setInputValue("")
  }

  const scalDownAnimation = () => {
    Animated.timing(addIconAnival, {
      toValue: 0,
      timing: ANIMATED_TIMING,
      useNativeDriver: true,
      easing: EASING_BEZIER
    }).start()
    inputRef.focus()
  }

  const scalUpAnimation = () => {
    Animated.timing(addIconAnival, {
      toValue: 1,
      timing: ANIMATED_TIMING,
      useNativeDriver: true,
      easing: EASING_BEZIER
    }).start()
  }

  const toggleIconAnimatin = () => {
    if (showInput) scalUpAnimation()
    else scalDownAnimation()
    setShowInput(show => !show)
  }

  const openAndAnimateInput = () => {
    scalDownAnimation()
    setShowInput(true)
  }

  return (
    <View style={[styles.container, dark_style]}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <NativeFeedbackView style={styles.close} onPress={sortTasksAlpha}>
            <MaterialIcons name={sort_icon} color={colors.accent} size={28} />
          </NativeFeedbackView>
          <RobotoText style={{ ...styles.title, ...dark_text }}>
            Tasks List
          </RobotoText>
          <NativeFeedbackView style={styles.close} onPress={props.onCancel}>
            <AntDesign name='close' color={colors.accent} size={28} />
          </NativeFeedbackView>
        </View>
      </View>
      <View style={styles.body}>
        {props.taskList.data.length > 0 ? (
          <RadioListView
            data={data}
            selectedIndex={selectedIndex}
            renderItem={itemprop => (
              <RadioItem
                {...itemprop}
                theme={props.theme}
                onCancel={props.onCancel}
                onSelect={props.onSelect}
                onDelete={props.onDelete}
              />
            )}
          />
        ) : (
          <NativeFeedbackView
            style={styles.emptyButton}
            onPress={openAndAnimateInput}>
            <RobotoText style={styles.emptyText}>Add a task now</RobotoText>
          </NativeFeedbackView>
        )}
      </View>
      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <Animated.View
            style={[
              styles.inputAniContainer,
              {
                transform: [
                  {
                    translateX: addIconAnival.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, dimensions.WIDTH - 100]
                    })
                  }
                ]
              }
            ]}>
            <Input
              style={darkTheme ? styles.darkInput : {}}
              value={inputValue}
              placeholder='Task'
              onChangeText={inputValueHandler}
              onSubmitEditing={taskAddHandler}
              editable={showInput}
              autoFocus={showInput}
              getRef={setinputRef}
            />
          </Animated.View>
        </View>
        <Animated.View
          style={[
            styles.addButtonAniContainer,
            {
              transform: [
                {
                  scaleX: addIconAnival.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.76, 1]
                  })
                },
                {
                  scaleY: addIconAnival.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.76, 1]
                  })
                },
                {
                  rotate: addIconAnival.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["135deg", "0deg"]
                  })
                }
              ]
            }
          ]}>
          <NativeFeedbackView
            onPress={toggleIconAnimatin}
            style={styles.addButton}>
            <AntDesign name='plus' color={colors.light} size={30} />
          </NativeFeedbackView>
        </Animated.View>
      </View>
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
  body: {
    flex: 1,
    paddingBottom: 15,
    paddingTop: 10,
    paddingHorizontal: 15
  },
  addButton: {
    backgroundColor: colors.accent,
    width: sizes.add_task_button,
    height: sizes.add_task_button,
    borderRadius: sizes.add_task_button / 2,
    elevation: 6
  },
  addButtonAniContainer: {
    position: "absolute",
    right: 10
  },
  emptyText: {
    color: colors.primary_transparent
  },
  emptyButton: {
    height: 50,
    borderColor: colors.primary_transparent,
    backgroundColor: "transparent",
    borderStyle: "dashed",
    borderWidth: 2,
    borderRadius: 5,
    marginHorizontal: 5,
    marginTop: 5
  },
  inputAniContainer: {
    flex: 1,
    height: 40
  },
  inputContainer: {
    flex: 1,
    height: 40,
    overflow: "hidden",
    marginEnd: 20
  },
  darkInput: {
    flex: 1,
    color: colors.light,
    borderRadius: 40 / 2,
    paddingStart: 12,
    paddingEnd: sizes.add_task_button / 2,
    borderColor: colors.primary,
    borderWidth: 1,
    backgroundColor: colors.dark_theme_modal
  },
  footer: {
    // backgroundColor: "#8762c180",
    position: "absolute",
    height: 80,
    width: "100%",
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15
  }
})

export default TaskListView
