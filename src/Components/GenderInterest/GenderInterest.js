import React, { Component } from 'react';
import { View, Text, Picker, StyleSheet } from 'react-native';
import firebase from 'react-native-firebase';

class PickerExample extends Component {
  state = { user: '' };
  updateUser = user => {
    this.setState({ user: user });
  };
  render() {
    return (
      <View style={{ width: 150, borderWidth: 1, borderColor: '#D85A3A' }}>
        <Picker
          selectedValue={this.state.user}
          onValueChange={(itemValue, itemIndex) =>
            this.props.settingsDataResponse(itemValue)
          }
        >
          <Picker.Item color="#D85A3A" label="Male" value="Male" />
          <Picker.Item color="#D85A3A" label="Female" value="Female" />
          <Picker.Item color="#D85A3A" label="Both" value="Both" />
        </Picker>
        {/* <Text style={styles.text}>{this.state.user}</Text> */}
      </View>
    );
  }
}
export default PickerExample;

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    alignSelf: 'center',
    color: 'red',
  },
});
