import { Dimensions } from "react-native"
import Constants from "expo-constants"

const HEIGHT = Dimensions.get("window").height - Constants.statusBarHeight
const WIDTH = Dimensions.get("window").width
const HEADER_HEIGHT = HEIGHT * 0.072
const BODY_HEIGHT = HEIGHT * 0.44
const FOOTER_HEIGHT = HEIGHT - (HEADER_HEIGHT + BODY_HEIGHT)
const TASK_RECORD_HEIGHT = HEIGHT * 0.07
const TASK_RECORD_DETAIL_HEIGHT = HEIGHT * 0.09

export const colors = {
  light: "#fff",
  dark: "#000",
  light_transparent_strong: "#ffffffDA",
  light_transparent: "#ffffff80",
  light_transparent_soft: "#ffffff50",
  watch_background: "#ffffff1A",

  primary: "#5E57B4",
  primary_transparent: "#5E57B4A0",
  accent: "#8762C1"
}

export const sizes = {
  header_font: 16,
  control_icon: 24
}

export const dimensions = {
  WIDTH: WIDTH,
  HEIGHT: HEADER_HEIGHT,
  HEADER_HEIGHT: HEADER_HEIGHT,
  BODY_HEIGHT: BODY_HEIGHT,
  FOOTER_HEIGHT: FOOTER_HEIGHT,
  WATCH_DIM: WIDTH * 0.64,
  TASK_RECORD_HEIGHT: TASK_RECORD_HEIGHT,
  TASK_RECORD_DETAIL_HEIGHT: TASK_RECORD_DETAIL_HEIGHT,

  CONTROL_ICON_DIM: 54
}
