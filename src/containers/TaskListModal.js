import React from "react"
import Modal from "react-native-modal"

import TaskListView from "../components/TaskListView"

const TaskListModal = props => (
  <Modal
    animationIn='bounceIn'
    animationOut='bounceOutDown'
    animationInTiming={240}
    animationOutTiming={240}
    isVisible={props.isVisible}
    backdropOpacity={0.5}
    onBackButtonPress={props.onClose}
    onSwipeComplete={props.onClose}
    swipeDirection='down'
    swipeThreshold={30}
    avoidKeyboard={false}
    useNativeDriver={true}>
    <TaskListView onCancel={props.onClose} />
  </Modal>
)

export default TaskListModal
