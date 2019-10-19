import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableOpacity,
    Image,
    Alert,
    SafeAreaView,
    Dimensions
} from 'react-native';
import firebase from 'react-native-firebase';
import LinearGradient from 'react-native-linear-gradient';
import Toast, { DURATION } from 'react-native-easy-toast';

export default class AuthPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // email: 'shubham@gmail.com',
            // password: '123456',

            email: '',
            password: '',
        }

        var currentUser = firebase.auth().currentUser;

        if (currentUser) {
            // console.log("You are login ")
            // console.log(currentUser.toJSON())
            this.props.navigation.navigate("SignedIn");
        } else {
			this.props.navigation.navigate("SignedOut");
        }
    } 
    
    render() {
        return (
             
            <SafeAreaView style={{ flex: 1 }}>

                <LinearGradient style={styles.containerWrapper}
                    start={{ x: 0, y: -.4 }} end={{ x: 1, y: 0 }}
                    colors={['#303030', '#303030']}  >
                    <View style={styles.container} >
                         <Text style={styles.loading}>LOADING...</Text>
                    </View>
                </LinearGradient>
                <Toast
					ref="toast"
					style={styles.toastStyle}
					position='bottom'
					positionValue={100}
					fadeInDuration={100}
					fadeOutDuration={1000}
					opacity={0.8}
					textStyle={{ color: '#fff' }} />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    containerWrapper: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#16161600', // '#6b6d6e',
    },
  

    loading: {
        color: "#ededed",
        fontFamily: "IntroCondLightFree",
        fontSize: 33
    },
     
});
