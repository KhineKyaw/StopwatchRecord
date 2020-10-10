import React from "react"
import Modal from "react-native-modal"
import { connect } from "react-redux"

import TaskListView from "../components/TaskListView"
import {
  selectTask,
  removeTask,
  updateTaskList,
  sortTaskList
} from "../redux/actions"

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
      onDelete={props.removeTask}
      onTaskAdd={props.updateTaskList}
      onSort={props.sortTaskList}
      sorted={props.taskList.sorted}
      theme={props.theme}
    />
  </Modal>
)

const mapStateToProps = state => ({
  taskList: state.task_list,
  theme: state.theme
})

export default connect(mapStateToProps, {
  selectTask,
  removeTask,
  updateTaskList,
  sortTaskList
})(TaskListModal)
