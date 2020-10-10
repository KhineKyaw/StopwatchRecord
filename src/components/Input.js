import React from "react"
import { StyleSheet } from "react-native"
import { TextInput } from "react-native-gesture-handler"
import { colors, sizes } from "../constants"

class Input extends React.Component {
  render() {
    return (
      <TextInput
        {...this.props}
        style={{ ...styles.input, ...this.props.style }}
        placeholderTextColor={colors.primary_transparent}
        ref={input => this.props.getRef(input)}
        blurOnSubmit={false}
      />
    )
  }
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    borderRadius: 40 / 2,
    paddingStart: 12,
    paddingEnd: sizes.add_task_button / 2,
    borderColor: colors.primary,
    borderWidth: 1,
    backgroundColor: colors.light
  }
})

export default Input
