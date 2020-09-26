import React from "react"
import { StyleSheet, Text } from "react-native"

const RobotoText = props => (
  <Text {...props} style={{ ...styles.font, ...props.style }}>
    {props.children}
  </Text>
)

const styles = StyleSheet.create({
  font: {
    fontFamily: "RobotoMedium",
    color: "#fff"
  }
})

export default RobotoText
