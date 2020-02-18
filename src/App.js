import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './Screens/MainScreen/MainScreen';
import ProfileScreen from './Screens/ProfileScreen/Profile';
import Swipe from './Screens/SwipeScreen/Swipe';
import SympathyList from './Screens/SympathyList/SympathyList';
import Chat from './Screens/Chat/Chat';
import ProfilePreview from './Screens/ProfilePreview/ProfilePreview';

const MainNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            headerShown: false,
        },
    },
    Profile: { screen: ProfileScreen },
    SwipeScreen: {
        screen: Swipe,
        navigationOptions: {
            headerShown: false,
        },
    },
    SympathyList: {
        screen: SympathyList,
    },
    Chat: {
        screen: Chat,
    },
    ProfilePreview: {
        screen: ProfilePreview,
    },
});

const App = createAppContainer(MainNavigator);

export default App;
