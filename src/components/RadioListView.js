import React from "react"
import { View, FlatList } from "react-native"

const RadioListView = props => (
  <View>
    <FlatList
      data={props.data}
      renderItem={itemprop => (
        <props.renderItem
          {...itemprop}
          checked={props.selectedIndex === itemprop.index}
          onSelect={props.onSelect}
          onDelete={props.onDelete}
        />
      )}
    />
  </View>
)

export default RadioListView
