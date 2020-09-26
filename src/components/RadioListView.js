import React from "react"
import { View, FlatList } from "react-native"

const RadioListView = props => (
  <View>
    <FlatList
      data={props.data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={itemprop => (
        <props.renderItem
          {...itemprop}
          checked={props.selectedIndex === itemprop.index}
          onSelect={props.onSelect}
        />
      )}
    />
  </View>
)

export default RadioListView
