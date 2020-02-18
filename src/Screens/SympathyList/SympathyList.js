import React, {Component} from 'react';
import {View, ScrollView, Image, Text, TouchableHighlight} from 'react-native';

class SympathyList extends Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <ScrollView style={{backgroundColor: '#182343'}}>
        <View
          style={{
            borderColor: 'gray',
            borderWidth: 1,
            flexDirection: 'row',
            backgroundColor: 'white',
            margin: 10,
          }}>
          <Image
            style={{height: 50, width: 50}}
            source={{uri: 'https://facebook.github.io/react/logo-og.png'}}
          />
          <Text style={{padding: 12}}>Persons Name</Text>
          <TouchableHighlight
            style={{right: 0, position: 'absolute'}}
            title="Chat"
            onPress={() => navigate('Chat', {name: 'Chat'})}>
            <Text
              style={{
                color: 'white',
                backgroundColor: 'orange',
                height: 50,
                alignContent: 'center',
                padding: 12,
                borderColor: '#182343',
                borderWidth: 2,
                borderRadius: 5,
              }}>
              Chat
            </Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  }
}

export default SympathyList;
