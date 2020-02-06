import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {handleFbLogin} from './lib/auth';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Button
          onPress={handleFbLogin}
          title="Sign in with facebook"
          color="#3c50e8"
        />
        <Button
          title="Go to Jane's profile"
          onPress={() => navigate('Profile', {name: 'Jane'})}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default HomeScreen;