import React from "react"
import Modal from "react-native-modal"
import { connect } from "react-redux"

import TaskListView from "../components/TaskListView"
import { selectTask } from "../redux/actions"

const TaskListModal = props => (
  <Modal
    animationIn='bounceIn'
    animationOut='fadeOutDown'
    animationInTiming={200}
    animationOutTiming={200}
    isVisible={props.isVisible}
    backdropOpacity={0.5}
    onBackButtonPress={props.onClose}
    onSwipeComplete={props.onClose}
    swipeDirection='down'
    swipeThreshold={30}
    avoidKeyboard={false}
    useNativeDriver={true}>
    <TaskListView
      onCancel={props.onClose}
      taskList={props.taskList}
      onSelect={props.selectTask}
    />
  </Modal>
)

const mapStateToProps = state => ({
  taskList: state.task_list
})

export default connect(mapStateToProps, { selectTask })(TaskListModal)
