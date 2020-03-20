import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  Picker,
  TouchableHighlight,
} from 'react-native';

import ViewPager from '../../Components/ViewPager/ViewPager';

class ProfilePreview extends Component {
  render(route) {
    // const { name } = route.params;
    return (
      <View>
        <Image
          style={{ width: '100%', height: 200 }}
          source={{
            uri: 'https://facebook.github.io/react/logo-og.png',
          }}
        />
        <Text>Nicname of person</Text>
        <Text>DESCRIPTION</Text>
      </View>
    );
  }
}

export default ProfilePreview;
