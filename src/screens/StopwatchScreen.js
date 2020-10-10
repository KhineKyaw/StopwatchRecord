import { StatusBar } from "expo-status-bar"
import React, { useEffect, useState } from "react"
import { StyleSheet, View, Dimensions } from "react-native"
import Constants from "expo-constants"

import fetchFonts from "../general/fetchFonts"
import { colors } from "../constants"
import { LinearGradient } from "expo-linear-gradient"
import Header from "../containers/Header"
import Body from "../containers/Body"
import Footer from "../containers/Footer"
import TaskListModal from "../containers/TaskListModal"
import TaskRecordsModal from "../containers/TaskRecordsModal"
import LoadingScreen from "./LoadingScreen"
import { connect } from "react-redux"

const StopwatchScreen = props => {
  const [appStart, setAppStart] = useState(false)
  const [showTaskList, setShowTaskList] = useState(false)
  const [showTaskRecords, setShowTaskRecords] = useState(false)

  let gradient_colors = [colors.accent, colors.primary]
  if (props.theme.darkTheme)
    gradient_colors = [colors.dark_theme_primary, colors.dark_theme_primary]

  const toggleTaskListHandler = () => {
    setShowTaskList(show => !show)
  }

  const closeTaskListHandler = () => {
    setShowTaskList(false)
  }

  const toggleTaskRecordsHandler = () => {
    setShowTaskRecords(show => !show)
  }

  const closeTaskRecordsHandler = () => {
    setShowTaskRecords(false)
  }

  return appStart ? (
    <View style={styles.container}>
      <LinearGradient colors={gradient_colors} style={styles.gradient} />
      <Header onTap={toggleTaskListHandler} />
      <Body />
      <Footer onSelect={toggleTaskRecordsHandler} />
      <TaskListModal isVisible={showTaskList} onClose={closeTaskListHandler} />
      <TaskRecordsModal
        isVisible={showTaskRecords}
        onClose={closeTaskRecordsHandler}
      />
      <StatusBar style='auto' translucent={true} />
    </View>
  ) : (
    <LoadingScreen
      startAsync={fetchFonts}
      onFinish={() => setAppStart(true)}
      onError={() => console.log("Fonts loading error!")}
    />
  )
}

const mapStateToProps = state => ({
  theme: state.theme
})

export default connect(mapStateToProps)(StopwatchScreen)

const HEIGHT = Dimensions.get("window").height

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: HEIGHT
  }
})
