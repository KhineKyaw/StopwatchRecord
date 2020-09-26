import React from "react"
import { StyleSheet } from "react-native"
import Modal from "react-native-modal"
import { connect } from "react-redux"

import TaskRecordDetailView from "../components/TaskRecordDetailView"
import { clearTaskRecords, removeTaskRecord } from "../redux/actions"

const TaskRecordsModal = props => {
  const onClearTaskHandler = () => {
    props.clearTaskRecords()
  }

  return (
    <Modal
      style={styles.modal}
      animationIn='slideInUp'
      animationOut='bounceOutDown'
      animationInTiming={240}
      animationOutTiming={240}
      isVisible={props.isVisible}
      backdropOpacity={0}
      onBackButtonPress={props.onClose}
      onSwipeComplete={props.onClose}
      swipeDirection='down'
      swipeThreshold={30}
      avoidKeyboard={false}
      useNativeDriver={true}>
      <TaskRecordDetailView
        onCancel={props.onClose}
        taskRecords={props.taskRecords}
        onClearAll={onClearTaskHandler}
        onDelete={removeTaskRecord}
      />
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    margin: 0
  }
})

const mapStateToProps = state => ({
  taskRecords: state.task_records
})

export default connect(mapStateToProps, { clearTaskRecords, removeTaskRecord })(
  TaskRecordsModal
)
