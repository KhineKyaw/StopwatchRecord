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
  light_transparent_strong: "#ffffffDA",
  light_transparent: "#ffffff80",
  light_transparent_soft: "#ffffff50",
  dark: "#000",
  dark_transparent: "#00000050",
  watch_background: "#ffffff1A",

  dark_theme_primary: "#27263f",
  dark_theme_modal: "#222222",

  primary: "#5E57B4",
  primary_transparent: "#5E57B4A0",
  accent: "#8762C1"
}

export const sizes = {
  header_font: 16,
  control_icon: 24,
  add_task_button: 58,
  carrot_icon: 26
}

export const dimensions = {
  WIDTH: WIDTH,
  HEIGHT: HEADER_HEIGHT,
  HEADER_HEIGHT: HEADER_HEIGHT,
  BODY_HEIGHT: BODY_HEIGHT,
  FOOTER_HEIGHT: FOOTER_HEIGHT,
  WATCH_DIM: WIDTH * 0.65,
  TASK_RECORD_HEIGHT: TASK_RECORD_HEIGHT,
  TASK_RECORD_DETAIL_HEIGHT: TASK_RECORD_DETAIL_HEIGHT,

  CONTROL_ICON_DIM: 54
}
