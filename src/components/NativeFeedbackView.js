import React from "react"
import { View, StyleSheet, TouchableNativeFeedback } from "react-native"

const NativeFeedbackView = props => (
  <View style={{ ...styles.default, ...props.style }}>
    <TouchableNativeFeedback onPress={props.onPress} delayPressIn={0}>
      <View style={{ ...styles.container, ...props.viewStyle }}>
        {props.children}
      </View>
    </TouchableNativeFeedback>
  </View>
)

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  default: {
    backgroundColor: "dodgerblue",
    overflow: "hidden"
  }
})

export default NativeFeedbackView
