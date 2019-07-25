import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableHighlight,
    Image,
    Alert,
    Dimensions
} from 'react-native';
import firebase from 'react-native-firebase'

export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        state = {
            email: 'shubham@gmail.com',
            password: '123456',
        }

        var currentUser = firebase.auth().currentUser;

        if (currentUser) {
            console.log("You are login ")
            console.log(currentUser.toJSON())
            this.props.navigation.navigate("UsersList")
        } else {
            console.log("You are not login ")
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(this.onUserChanged);
    }
    onUserChanged = (user) => {
        if (user) {
            console.log("Login ")
            console.log(user.toJSON())
            var usersRef = firebase.database().ref("users/" + user.uid) ;
            var emailRef = usersRef.child("email");
            var idRef = usersRef.child("userID");
            var onlineRef = usersRef.child("online");
            emailRef.set(user.email);
            idRef.set(user.uid);
            onlineRef.set(true)
            // usersRef.set({
            //     userID: user.uid,
            //     email: user.email,
            // });
            this.props.navigation.navigate("UsersList")
        } else {
            console.log("Logout ")
        }
    }

    onClickListener = (viewId) => {
        if (viewId == "register") {
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                Alert.alert("Error", errorCode + errorMessage);
                // ...
            });
        } else if (viewId == "login") {
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                Alert.alert("Error", errorCode + errorMessage);
                // ...
            });
        } else {
            Alert.alert("Alert", "Button pressed " + viewId);
        }

    }

    render() {
        return (
            // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            //     <Text>Login Screen</Text>
            //     <Button
            //         title="Go to Details"
            //         onPress={() => {
            //             this.props.navigation.dispatch(StackActions.reset({
            //                 index: 0,
            //                 actions: [
            //                     NavigationActions.navigate({ routeName: 'Details' })
            //                 ],
            //             }))
            //         }}
            //     />
            //     <Button
            //         title="Navigate to Details"
            //         onPress={() => {
            //             this.props.navigation.navigate("Details")
            //         }}
            //     />
            // </View>

            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/message/ultraviolet/50/3498db' }} />
                    <TextInput style={styles.inputs}
                        placeholder="Email"
                        keyboardType="email-address"
                        underlineColorAndroid='transparent'
                       
                        onChangeText={(email) => this.setState({ email })} />
                </View>

                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db' }} />
                    <TextInput style={styles.inputs}
                        placeholder="Password"
                        secureTextEntry={true}
                         
                        underlineColorAndroid='transparent'
                        onChangeText={(password) => this.setState({ password })} />
                </View>

                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('login')}>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('restore_password')}>
                    <Text>Forgot your password?</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('register')}>
                    <Text>Register</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: 'center'
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
    },
    loginButton: {
        backgroundColor: "#00b5ec",
    },
    loginText: {
        color: 'white',
    }
});
