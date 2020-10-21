import React, { useEffect } from "react"
import { StyleSheet, View, Image } from "react-native"
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
      <Image source={require("../../assets/splash.png")} style={sytles.image} />
      <StatusBar style='auto' translucent={true} />
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
    backgroundColor: "#fff",
    justifyContent: "center",
    alignContent: "center"
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  }
})

export default LoadingScreen
