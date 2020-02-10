import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './Screens/MainScreen/MainScreen';
import ProfileScreen from './Screens/ProfileScreen/Profile';
import Swipe from './Screens/SwipeScreen/Swipe';

const MainNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  Profile: {screen: ProfileScreen},
  
  SwipeScreen: {
    screen: Swipe,
    navigationOptions: {
      headerShown: false,
    },
  },
});

const App = createAppContainer(MainNavigator);

export default App;
