import React from "react"
import { StyleSheet, View } from "react-native"
import { TextInput } from "react-native-gesture-handler"
import { color } from "react-native-reanimated"
import { colors } from "../constants"

class Input extends React.Component {
  render() {
    return (
      <TextInput
        style={[styles.input, { ...this.props.style }]}
        placeholderTextColor={colors.primary_transparent}
        ref={input => this.props.getRef(input)}
        blurOnSubmit={false}
        {...this.props}
      />
    )
  }
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    borderRadius: 40 / 2,
    paddingHorizontal: 15,
    borderColor: colors.primary,
    borderWidth: 1,
    backgroundColor: colors.light
  }
})

export default Input
