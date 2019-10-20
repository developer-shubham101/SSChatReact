import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableOpacity,
    SafeAreaView,
    Image,
    Alert,
    Dimensions
} from 'react-native';
import firebase from 'react-native-firebase';

import appStyles, { colors, appColors } from './styles/common/index.style';

import LinearGradient from 'react-native-linear-gradient';
export default class EditProfileScreen extends React.Component {
    currentUser = firebase.auth().currentUser;
    userRef;
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            bio: ''
        }

        this.userRef = firebase.database().ref("users/" + this.currentUser.uid);
        firebase
            .database()
            .ref("users/" + this.currentUser.uid)
            .once("value", snap => {
                console.log(snap);
                this.setState({
                    name: snap.val().name,
                    email: snap.val().email,
                    bio: snap.val().bio
                });
            });
    }

    componentDidMount() { }

    onClickListener = viewId => {
        if (viewId == "update") {
            this.userRef.child("name").set(this.state.name);
            this.userRef.child("bio").set(this.state.bio);
        } else if (viewId == "back") {
            this.props.navigation.goBack();
        } else {
            Alert.alert("Alert", "Button pressed " + viewId);
        }
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.toolbarWrapper}>
                    <TouchableOpacity activeOpacity={0.7}
                        style={styles.backIconWrapper}
                        onPress={() => this.onClickListener("back")}
                    >
                        <Image source={require("./../assets/img/ic_back.png")}
                            style={styles.backIcon} />

                    </TouchableOpacity>
                    <Text style={styles.toolbarTitle}>EDIT PROFILE</Text>
                </View>

                <LinearGradient style={styles.containerWrapper}
                    start={{ x: 0, y: -.4 }} end={{ x: 1, y: 0 }}
                    colors={[appColors.bgColor, '#303030']}
                >
                    <View style={styles.container}>
                        <View style={[styles.inputContainer, styles.firstInput]}>
                            <TextInput
                                style={styles.inputs}
                                placeholder="Email"
                                placeholderTextColor="#999797"
                                value={this.state.email}
                                keyboardType="email-address"
                                underlineColorAndroid='transparent'
                                editable={false}
                            />
                        </View>
                        <View style={styles.inputContainer}>

                            <TextInput
                                style={styles.inputs}
                                placeholder="Name"
                                value={this.state.name}
                                underlineColorAndroid='transparent'
                                onChangeText={(name) => this.setState({ name })} />
                        </View>
                        <View style={styles.inputContainer}>

                            <TextInput
                                style={styles.inputs}
                                placeholder="Bio"
                                value={this.state.bio}
                                underlineColorAndroid="transparent"
                                onChangeText={bio => this.setState({ bio })}
                            />
                        </View>

                        <TouchableOpacity activeOpacity={0.7}
                            style={[styles.buttonContainer, styles.loginButton]}
                            onPress={() => this.onClickListener("update")}
                        >
                            <Text style={styles.loginText}>Update Profile</Text>
                            <Image style={styles.regIcon} source={require("./../assets/img/ic_long_next.png")} />
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    toolbarWrapper: {
        height: 90,
        backgroundColor: appColors.bgColor
        // backgroundColor: "#ddd"
    },
    backIconWrapper:{
        height: 25,
        width: 25,
        marginStart: 20,
        marginTop: 20,
    },
    backIcon: {
        height: 25,
        width: 25,
    },
    toolbarTitle: {

        color: "#d9983d",
        fontFamily: "IntroCondLightFree",
        marginTop: 10,
        marginStart: 30,
        fontSize: 30
    },

    containerWrapper: {
        flex: 1,
    },
    firstInput: {
        marginTop: 20
    },
    container: {
        flex: 1,
        // alignItems: 'center',
        backgroundColor: '#DCDCDC00',
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

    buttonContainer: {
        marginStart: 70,
        flexDirection: "row"
    },
    loginButton: {
        marginTop: 60
    },
    regIcon:{
        width: 65,
        marginStart: 30,
        // backgroundColor: "#000",
        height: 20,
        resizeMode: "center"
    },
    loginText: {
        color: "#ededed",
        fontFamily: "IntroCondLightFree",
        fontSize: 18
    }
});
