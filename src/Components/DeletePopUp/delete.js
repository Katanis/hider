import React, { Component, useState, Children } from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
const Delete = props => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <TouchableHighlight onPress={() => alert('delete')}>
          <Text>DELTE</Text>
        </TouchableHighlight>
      </Modal>
      <TouchableHighlight onLongPress={setModalVisible(true)}>
        {props.children}
      </TouchableHighlight>
    </View>
  );
};
export default Delete;
