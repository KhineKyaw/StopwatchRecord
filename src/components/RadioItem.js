import { MaterialIcons } from "@expo/vector-icons"
import React from "react"
import { StyleSheet, View, TouchableOpacity } from "react-native"

import { colors, dimensions } from "../constants"
import RobotoText from "./RobotoText"

const RadioItem = props => {
  const [icon_name, icon_color] = props.checked
    ? ["checked", colors.accent]
    : ["unchecked", "gray"]
  const border_color = props.checked ? colors.accent : "#00000020"

  const itemSelectHandler = () => {
    props.onSelect(props.item)
  }

  return (
    <View style={[styles.container, { borderColor: border_color }]}>
      <TouchableOpacity
        style={styles.touchArea}
        delayPressIn={0}
        activeOpacity={0.5}
        onPress={itemSelectHandler}>
        <View style={styles.radioIconContainer}>
          <MaterialIcons
            name={`radio-button-${icon_name}`}
            size={22}
            color={icon_color}
          />
        </View>
        <View
          style={styles.textContainer}
          delayPressIn={0}
          activeOpacity={0.5}
          onPress={itemSelectHandler}>
          <RobotoText style={styles.text}>{props.item.label}</RobotoText>
        </View>
      </TouchableOpacity>
      <View style={styles.removeIconConatiner}>
        <MaterialIcons name='remove' size={22} color={colors.accent} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderColor: "#00000020",
    borderRadius: 5,
    borderWidth: 1,

    marginBottom: 10,
    flexDirection: "row",
    height: dimensions.TASK_RECORD_DETAIL_HEIGHT
  },
  touchArea: {
    flex: 1,
    flexDirection: "row"
  },
  radioIconContainer: {
    // backgroundColor: "#00000020",
    width: "12%",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    color: colors.dark,
    fontFamily: "Roboto"
  },
  textContainer: {
    flex: 1,
    justifyContent: "center"
  }
})

export default RadioItem
