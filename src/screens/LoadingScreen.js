import React, { useEffect } from "react"
import { StyleSheet, View } from "react-native"
import PropTypes from "prop-types"
import { StatusBar } from "expo-status-bar"

const LoadingScreen = props => {
  useEffect(() => {
    onMount()
  })

  const onMount = async () => {
    try {
      await props.startAsync()
      props.onFinish()
    } catch (err) {
      props.onError()
    }
  }

  return (
    <View style={sytles.container}>
      <StatusBar style='auto' hidden={true} />
    </View>
  )
}

LoadingScreen.propTypes = {
  startAsync: PropTypes.func,
  onFinish: PropTypes.func,
  onError: PropTypes.func
}

const sytles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "skyblue"
  }
})

export default LoadingScreen
