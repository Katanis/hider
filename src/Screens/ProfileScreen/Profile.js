import React from 'react';
import {View, Text, Image, TextInput, Button, Picker} from 'react-native';

import GenderInterest from '../../Components/GenderInterest/GenderInterest';
import InputField from '../../Components/InputField/Input';

class Profile extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };

  RadioButton(props) {
    return (
      <View
        style={[
          {
            height: 24,
            width: 24,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: '#000',
            alignItems: 'center',
            justifyContent: 'center',
          },
          props.style,
        ]}>
        {props.selected ? (
          <View
            style={{
              height: 12,
              width: 12,
              borderRadius: 6,
              backgroundColor: '#000',
            }}
          />
        ) : null}
      </View>
    );
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={{backgroundColor: '#182343', height: '100%'}}>
        {/* PROFILE PHOTO FROM FB */}
        <Image
          source={{uri: 'https://facebook.github.io/react/logo-og.png'}}
          style={{width: 150, height: 150}}
        />
        {/* NICNAME FOR USER */}
        <View style={{flexDirection: 'row', paddingTop: 10}}>
          <Text style={{paddingTop: 10, color: '#D85A3A'}}>
            Your nickname:{' '}
          </Text>
          <InputField style={{width: 100, color: '#D85A3A'}} />
        </View>
        {/* DESCRIPTION ABOUT YOUR SELF */}
        <TextInput
          style={{
            borderColor: '#D85A3A',
            borderWidth: 1,
            paddingTop: 20,
            width: 200,
            marginTop: 10,
            color: '#D85A3A',
          }}
        />

        {/* INTEREST CHOISE */}
        <View style={{flexDirection: 'row', paddingTop: 10, height: 60}}>
          <Text style={{paddingTop: 15, color: '#D85A3A'}}>
            What are you in to?
          </Text>
          <GenderInterest />
        </View>
        {/* SUBMIT BUTTON */}
        <Button title="Save" style={{width: 50}} />
      </View>
    );
  }
}

export default Profile;
