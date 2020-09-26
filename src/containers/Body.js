import { MaterialIcons } from "@expo/vector-icons"
import React from "react"
import { View, StyleSheet } from "react-native"

import NativeFeedbackView from "../components/NativeFeedbackView"
import RobotoText from "../components/RobotoText"
import { colors, dimensions, sizes } from "../constants"

const Body = props => (
  <View style={styles.container}>
    <View style={styles.watchWrapper}>
      <NativeFeedbackView style={styles.watchContainer}>
        <RobotoText style={styles.timeText}>00:00:00</RobotoText>
      </NativeFeedbackView>
    </View>
    <View style={styles.controlContainer}>
      <NativeFeedbackView style={styles.controlIcon}>
        <MaterialIcons
          name='replay'
          color={colors.light}
          size={sizes.control_icon}
        />
      </NativeFeedbackView>
      <NativeFeedbackView style={styles.controlIcon}>
        <MaterialIcons
          name='save'
          color={colors.light}
          size={sizes.control_icon}
        />
      </NativeFeedbackView>
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    height: dimensions.BODY_HEIGHT,
    // borderColor: "#ffffff60",
    // borderWidth: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  watchWrapper: {
    flex: 1,
    justifyContent: "center"
  },
  watchContainer: {
    backgroundColor: colors.watch_background,
    width: dimensions.WATCH_DIM,
    height: dimensions.WATCH_DIM,
    borderRadius: dimensions.WATCH_DIM / 2
  },
  timeText: {
    fontFamily: "RobotoThin",
    fontSize: 48
  },
  controlContainer: {
    flexDirection: "row",
    width: "100%",
    position: "absolute",
    justifyContent: "space-between",
    paddingHorizontal: 24
  },
  controlIcon: {
    width: dimensions.CONTROL_ICON_DIM,
    height: dimensions.CONTROL_ICON_DIM,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.light,
    borderRadius: dimensions.CONTROL_ICON_DIM / 2
  }
})

export default Body
