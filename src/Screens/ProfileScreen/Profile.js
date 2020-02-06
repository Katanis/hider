import {View} from 'react-native';

class Profile extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const {navigate} = this.props.navigation;
    return <View>Hello this is your profile</View>;
  }
}
