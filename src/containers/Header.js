import React from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons"
import { connect } from "react-redux"

import RobotoText from "../components/RobotoText"
import NativeFeedbackView from "../components/NativeFeedbackView"
import { colors, dimensions, sizes } from "../constants"

const Header = props => (
  <View style={styles.container}>
    <TouchableOpacity
      style={styles.taskListContainer}
      delayPressIn={0}
      onPress={props.onTap}>
      <View style={styles.circleoIconContainer}>
        <AntDesign name='downcircleo' color={colors.light} size={21} />
      </View>
      <View style={styles.taskListView}>
        <RobotoText style={styles.taskList} numberOfLines={1}>
          {props.taskList.selected.label || "Lap"}
        </RobotoText>
      </View>
    </TouchableOpacity>
    <NativeFeedbackView style={styles.nightIconContainer}>
      <MaterialCommunityIcons
        name='weather-night'
        color={colors.light}
        size={26}
      />
    </NativeFeedbackView>
  </View>
)

const styles = StyleSheet.create({
  container: {
    height: dimensions.HEADER_HEIGHT,
    // borderColor: "#ffffff60",
    // borderWidth: 1,
    alignItems: "center",
    flexDirection: "row"
  },
  circleoIconContainer: {
    width: dimensions.HEADER_HEIGHT,
    height: dimensions.HEADER_HEIGHT,
    justifyContent: "center",
    alignItems: "center"
  },
  nightIconContainer: {
    width: dimensions.HEADER_HEIGHT,
    height: dimensions.HEADER_HEIGHT,
    borderRadius: dimensions.HEADER_HEIGHT / 2,
    backgroundColor: "transparent"
  },
  taskListContainer: {
    width: dimensions.WIDTH - dimensions.HEADER_HEIGHT,
    flexDirection: "row"
  },
  taskList: {
    textAlign: "center",
    fontSize: sizes.header_font,
    marginTop: 3
  },
  taskListView: {
    flex: 1,
    height: dimensions.HEADER_HEIGHT,
    justifyContent: "center",
    alignItems: "center"
  }
})

const mapStateToProps = state => ({
  taskList: state.task_list
})

export default connect(mapStateToProps)(Header)
