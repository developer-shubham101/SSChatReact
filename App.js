/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import firebase from 'react-native-firebase';
import LoginScreen from './src/LoginScreen'
import UsersList from './src/UsersList'
import ChatScreen from './src/ChatScreen'
import ProfileScreen from './src/ProfileScreen'
import Examples from './src/Examples'
import EditProfileScreen from './src/EditProfileScreen';
import AuthPage from "./src/AuthPage";
import AllUsersList from "./src/AllUsersList";
import AllUsersListForGroup from "./src/AllUsersListForGroup";



import {
    createStackNavigator,
    createAppContainer,
    createDrawerNavigator,
    createBottomTabNavigator,
    createSwitchNavigator,
    TabBarBottom
} from 'react-navigation';

const TabScreen = (props) => (<View><Text>HELLO WORLD</Text></View>);

const TabBarComponent = (props) => (<TabBarBottom {...props} />);
//ic_user.png
const TabNavigator = createBottomTabNavigator({

    UsersList: {
        screen: UsersList,
        navigationOptions: () => ({
            title: `MATES`,
            tabBarIcon: ({ focused }) => {
                var icon = require('./assets/img/ic_chat.png');
                if (focused) {
                    icon = require('./assets/img/ic_chat.png');
                }
                return (
                    <Image style={{ width: 22, height: 22 }} source={icon} />
                )
            }
        }),
    },
    Profile: {
        screen: ProfileScreen,
        navigationOptions: () => ({
            title: `PROFILE`,
            tabBarIcon: ({ focused }) => {
                var icon = require('./assets/img/ic_user.png');
                if (focused) {
                    icon = require('./assets/img/ic_user.png');
                }
                return (
                    <Image style={{ width: 22, height: 22 }} source={icon} />
                )
            }
        }),
    },
},
    {
        // tabBarComponent: props => <TabBarComponent {...props} style={{ borderTopColor: '#605F60' }} />,
        tabBarOptions: {
            activeTintColor: '#d6d6d6',
            labelStyle: {
                fontSize: 12,
            },
            style: {
                backgroundColor: '#141414',
            },
            labelStyle: {
                fontFamily: "IntroCondLightFree",
            },
        }
    });
const SignedInNavigator = createStackNavigator({
	AllUsersListForGroup: {
		screen: AllUsersListForGroup
	},
    AllUsersList: {
        screen: AllUsersList
    },
    EditProfileScreen: {
        screen: EditProfileScreen
    },
    Chat: {
        screen: ChatScreen
    },
    Examples: {
        screen: Examples
    },
    TabNavigator: {
        screen: TabNavigator
    }
}, {
    initialRouteName: 'TabNavigator',
    headerMode: 'none',
    mode: 'modal'
});

const SignedOutNavigator = createStackNavigator({
    LoginScreen: {
        screen: LoginScreen,
    },
}, {
    initialRouteName: 'LoginScreen',
    headerMode: 'none',
    mode: 'modal'
});


export const SwitchNavigator = createSwitchNavigator({
    AuthPage: {
        screen: AuthPage
    },
    SignedOut: {
        screen: SignedOutNavigator
    },
    SignedIn: {
        screen: SignedInNavigator
    },
}, {
    initialRouteName: "AuthPage",

});


const AppContainer = createAppContainer(SwitchNavigator);

export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}

