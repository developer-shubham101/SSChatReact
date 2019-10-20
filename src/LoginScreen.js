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

import appStyles, { colors, appColors } from './styles/common/index.style';

export default class LoginScreen extends React.Component {

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
            var usersRef = firebase.database().ref("users/" + user.uid);
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
    validate = (text) => {
        // console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            console.log("Email is Not Correct");
            // this.setState({ email: text })
            return false;
        }
        else {
            // this.setState({ email: text })
            console.log("Email is Correct");
            return true;
        }
    }
    onClickListener = (viewId) => {
        if (viewId == "register") {

            if (this.state.email == "") {
                this.refs.toast.show('Please enter E-Mail');
            } else if (!this.validate(this.state.email)) {
                this.refs.toast.show('Please enter correct E-Mail');
            } else if (this.state.password == "") {
                this.refs.toast.show('Please enter password');
            } else {
                firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    Alert.alert("Error", errorCode + errorMessage);
                    // ...
                });
            }


        } else if (viewId == "login") {
            console.log(this.state);
            if (this.state.email == "") {
                this.refs.toast.show('Please enter E-Mail');
            } else if (!this.validate(this.state.email)) {
                this.refs.toast.show('Please enter correct E-Mail');
            } else if (this.state.password == "") {
                this.refs.toast.show('Please enter password');
            } else {
                firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    Alert.alert("Error", errorCode + errorMessage);
                    // ...
                });
            }

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
            <SafeAreaView style={{ flex: 1 }}>

                <LinearGradient style={styles.containerWrapper}
                    start={{ x: 0, y: -.4 }} end={{ x: 1, y: 0 }}
                    colors={[appColors.bgColor, '#303030']}
                >
                    <View style={styles.container} >
                        <View style={styles.inputContainer}>
                            {/* <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/message/ultraviolet/50/3498db' }} /> */}
                            <TextInput
                                style={styles.inputs}
                                placeholderTextColor="#999797"
                                placeholder="Email"
                                keyboardType="email-address"
                                underlineColorAndroid='transparent'
                                returnKeyType={"next"}
                                onChangeText={(email) => this.setState({ email })}
                                onSubmitEditing={(event) => { this.refs.PasswordInput.focus() }}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            {/* <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db' }} /> */}
                            <TextInput style={styles.inputs}
                                ref='PasswordInput'
                                placeholderTextColor="#999797"
                                returnKeyType={"done"}
                                placeholder="Password"
                                secureTextEntry={true}

                                underlineColorAndroid='transparent'
                                onChangeText={(password) => this.setState({ password })}
                                onSubmitEditing={(event) => { this.onClickListener('login') }}
                            />
                        </View>

                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={[styles.buttonContainer, styles.loginButtonContainer]}
                            onPress={() => this.onClickListener('login')}>

                            <Text style={styles.buttonText}>GET ACCESS</Text>
                            <Image style={styles.loginIcon} source={require("./../assets/img/ic_short_next.png")} />
                        </TouchableOpacity>

                        {/*   <TouchableOpacity activeOpacity={0.7} style={styles.buttonContainer} onPress={() => this.onClickListener('restore_password')}>
                            <Text>Forgot your password?</Text>
                        </TouchableOpacity> */}

                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={[styles.buttonContainer, styles.regButtonContainer]}
                            onPress={() => this.onClickListener('register')}>
                            <Text style={[styles.buttonText, styles.registerButtonText]}>GET ACCESS FIRST TIME</Text>
                            <Image style={styles.regIcon} source={require("./../assets/img/ic_long_next.png")} />
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
                <Toast
                    ref="toast"
                    style={appStyles.toastStyle}
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
        // alignItems: 'center',
        backgroundColor: '#16161600', // '#6b6d6e',
    },
    inputContainer: {

        // backgroundColor: '#FFFFFF',
        // borderRadius: 30,
        // borderBottomWidth: 1,
        marginStart: 20,
        marginEnd: 20,
        width: "100%",
        height: 60,
        marginBottom: 20,
        flexDirection: 'row',
    },
    inputs: {
        borderBottomColor: '#d9983d',
        borderBottomWidth: 2,
        color: "#ededed",
        // backgroundColor: '#ddd',
        height: "100%",
        marginLeft: 16,
        paddingStart: 30,
        // borderBottomColor: '#FFFFFF',
        flex: 1,
        fontFamily: "IntroCondLightFree"
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: 'center'
    },
    buttonContainer: {
        marginStart: 70,
        flexDirection: "row",

    },
    regButtonContainer: {
        marginTop: 20
    },

    loginButtonContainer: {
        marginTop: 60
    },

    buttonText: {
        color: "#ededed",
        fontFamily: "IntroCondLightFree",
        fontSize: 18
    },
    loginIcon: {
        width: 45,
        marginStart: 30,
        // backgroundColor: "#000",
        height: 20,
        resizeMode: "center"
    },

    regIcon:{
        width: 65,
        marginStart: 30,
        // backgroundColor: "#000",
        height: 20,
        resizeMode: "center"
    },
    registerButtonText: {
        fontSize: 14
    },

});
