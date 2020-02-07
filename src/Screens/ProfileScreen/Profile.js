import React from 'react';
import {View, Text, Image, TextInput, Button} from 'react-native';
import InputField from '../../Components/InputField/Input';

class Profile extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View>
        {/* PROFILIO NUOTRAUKA IS FB */}
        <Image
          source={{uri: 'https://facebook.github.io/react/logo-og.png'}}
          style={{width: 150, height: 150}}
        />
        <View style={{flexDirection: 'row', padding: 10}}>
          <Text style={{padding: 10}}>Enter your nickname: </Text>
          <InputField style={{width: 100}} />
        </View>

        <Button title="Save" style={{width: 50}} />
      </View>
    );
  }
}

export default Profile;
