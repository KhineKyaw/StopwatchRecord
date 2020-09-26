import * as Font from "expo-font"

const fetchFonts = () =>
  Font.loadAsync({
    Roboto: require("../../assets/fonts/Roboto-Regular.ttf"),
    RobotoLight: require("../../assets/fonts/Roboto-Light.ttf"),
    RobotoThin: require("../../assets/fonts/Roboto-Thin.ttf"),
    RobotoMedium: require("../../assets/fonts/Roboto-Medium.ttf"),
    RobotoBold: require("../../assets/fonts/Roboto-Bold.ttf"),
    OpenSans: require("../../assets/fonts/OpenSans-Regular.ttf")
  })

export default fetchFonts
