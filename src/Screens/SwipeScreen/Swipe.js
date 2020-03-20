import React, { Component } from 'react';
import { View, Text, Image, TextInput, Button, Picker } from 'react-native';

import ViewPager from '../../Components/ViewPager/ViewPager';

class SwipeScreen extends Component {
  render() {
    return <ViewPager navigation={this.props.navigation} />;
  }
}

export default SwipeScreen;
