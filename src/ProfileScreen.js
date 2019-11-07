import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    SafeAreaView,
    TouchableOpacity,
    Alert,
    TouchableHighlight
} from 'react-native';
import firebase from 'react-native-firebase'
import ImagePicker from 'react-native-image-picker';

import appStyles, { colors, appColors } from './styles/common/index.style';

import LinearGradient from 'react-native-linear-gradient';
export default class ProfileScreen extends React.Component {
    currentUser = firebase.auth().currentUser;
    constructor(props) {
        super(props);
        this.state = { avatarSource: "https://bootdey.com/img/Content/avatar/avatar6.png", email: '', name: '', bio: "" }


    }
    componentDidMount() {
        firebase.firestore().collection("users").doc(this.currentUser.uid).get().then((snap) => {
            console.log("users", snap);
            let user = snap.data();
            this.setState({ name: user.name, email: user.email, bio: user.bio })
        });

        // Get a non-default Storage bucket
        // var storage = firebase.app().storage("gs://my-custom-bucket");

        // Create a reference with an initial file path and name
        var storage = firebase.storage().ref();
        var pathReference = storage.child('profilePics/' + this.currentUser.uid + '.jpg');

        // Get the download URL
        pathReference.getDownloadURL().then((url) => {
            console.log(url)
            this.setState({
                avatarSource: url,
            });
        }).catch(function (error) {

            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/object-not-found':
                    // File doesn't exist
                    break;

                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;

                case 'storage/canceled':
                    // User canceled the upload
                    break;
                case 'storage/unknown':
                    // Unknown error occurred, inspect the server response
                    break;
            }
        });
    }
    changeDP() {

        // well that came from https://github.com/react-native-community/react-native-image-picker
        // More info on all the options is below in the API Reference... just some common use cases shown here
        const options = {
            title: 'Select Avatar',

            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        /**
         * The first arg is the options object for customization (it can also be null or omitted for default options),
         * The second arg is the callback which sends object: response (more info in the API Reference)
         */
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                console.log(response)
                // const source = { uri: response.uri };

                // You can also display the image using data:
                const source = { uri: 'data:image/jpeg;base64,' + response.data };
                var storageRef = firebase.storage().ref();

                let path = 'profilePics/' + this.currentUser.uid + '.jpg'
                // Create a reference to 'mountains.jpg'
                var mountainsRef = storageRef.child(path);
                var metadata = {
                    contentType: 'image/jpeg',
                };
                var uploadTask = mountainsRef.put(response.path, metadata);


                // Listen for state changes, errors, and completion of the upload.
                uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                    (snapshot) => {
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                            case firebase.storage.TaskState.PAUSED: // or 'paused'
                                console.log('Upload is paused');
                                break;
                            case firebase.storage.TaskState.RUNNING: // or 'running'
                                console.log('Upload is running');
                                break;
                        }
                    }, (error) => {

                        // A full list of error codes is available at
                        // https://firebase.google.com/docs/storage/web/handle-errors
                        switch (error.code) {
                            case 'storage/unauthorized':
                                console.log(' User doesn\'t have permission to access the object')
                                break;

                            case 'storage/canceled':
                                console.log('User canceled the upload')
                                break;

                            case 'storage/unknown':
                                console.log(' Unknown error occurred, inspect error.serverResponse')
                                break;
                        }
                    }, () => {
                        // Upload completed successfully, now we can get the download URL
                        // uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        //     console.log('File available at', downloadURL);
                        // });
                    });


                // var usersRef = firebase.firestore().ref("users/" + this.currentUser.uid + "/dp/");
                firebase.firestore().collection("users").doc(this.currentUser.uid).update({ dp: path });
                // usersRef.set(path)
                // this.setState({
                //     avatarSource: source,
                // });
            }
        });
    }
    onClickListener = (viewId) => {
        if (viewId == "logout") {

            Alert.alert(
                'Alert!',
                'Are you sure to logout',
                [
                    {
                        text: 'Yes', onPress: () => {
                            firebase.auth().signOut().then(() => {
                                this.goLogin();
                            }).catch(function (error) {
                                console.log(error)
                                Alert.alert("Logout error", error);
                            });
                        }
                    },
                    {
                        text: 'No',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    }
                ],
                { cancelable: false },
            );


        } else if (viewId == "editProfile") {
            this.props.navigation.navigate("EditProfileScreen")

        } else if (viewId == 'changeDP') {

            Alert.alert(
                'Change Profile',
                '',
                [
                    { text: 'Remove Profile Pic', onPress: () => { this.changeDP() } },
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    { text: 'Change', onPress: () => { this.changeDP() } },
                ],
                { cancelable: false },
            );
        } else {
            Alert.alert("Alert", "Button pressed " + viewId);
        }

    }
    goLogin = () => {
        this.props.navigation.navigate("LoginScreen")
    }
    goBack = () => {
        this.props.navigation.goBack();
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <LinearGradient style={styles.containerWrapper}
                    start={{ x: 0, y: -.4 }} end={{ x: 1, y: 0 }}
                    colors={[appColors.bgColor, '#303030']}
                >
                    <View style={styles.container}>

                        <View style={styles.header}></View>

                        <TouchableHighlight style={styles.avatarWrapper} onPress={() => this.onClickListener('changeDP')}>
                            <Image style={styles.avatar} source={{ uri: this.state.avatarSource }} />
                        </TouchableHighlight>

                        <View style={styles.body}>
                            <Text style={styles.name}>{this.state.name}</Text>
                            <Text style={styles.info}>{this.state.email}</Text>
                            <Text style={styles.description}>{this.state.bio}</Text>
                        </View>


                        <View style={styles.bottomContainer}>
                            <TouchableOpacity style={styles.buttonContainer} onPress={() => this.onClickListener('editProfile')}>
                                <Text style={styles.buttonText} >Edit Profile </Text>
                                <Image style={[styles.buttonIcon, styles.buttonIconNext]} source={require("./../assets/img/ic_long_next.png")} />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.logoutButton]} onPress={() => this.onClickListener('logout')}>
                                <Image style={[styles.buttonIcon, styles.buttonIconPrevious]} source={require("./../assets/img/ic_short_previous.png")} />
                                <Text style={styles.buttonText}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
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
        flexDirection: 'column',
        backgroundColor: '#16161600', // '#6b6d6e',
    },
    header: {
        backgroundColor: "#000",
        height: 100,
    },
    avatarWrapper: {
        width: 100,
        height: 100,
        marginBottom: 10,
        marginStart: 10,
        position: 'absolute',
        marginTop: 55,
        borderRadius: 50,
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
        borderWidth: .5,
        borderColor: "#000",
    },
    name: {
        fontSize: 22,
        color: "#ededed",
        fontFamily: "Lato-Thin",
    },
    body: {
        marginTop: 40,
        flex: 1,
        padding: 30,
    },


    info: {
        fontSize: 16,
        color: "#ededed",
        fontFamily: "Lato-Thin",
        marginTop: 10
    },
    description: {
        fontSize: 12,
        color: "#696969",
        fontFamily: "Lato-Thin",
        marginTop: 10,

    },
    bottomContainer: {
        flex: 1,
        // flexDirection: 'row',
        // alignSelf: 'flex-end',
        // backgroundColor: "#ddd",
        width: "100%",
        position: 'absolute',
        bottom: 10

    },
    buttonContainer: {
        // flex: 1,
        // marginTop: 10,
        // height: 35,
        // flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center',
        // marginBottom: 20,
        // width: 250,
        // borderRadius: 30,
        // backgroundColor: "#00BFFF",
        // marginEnd: 5,
        // marginStart: 5

        flexDirection: "row",
        marginStart: 40,
    },
    logoutButton: {
        marginEnd: 30,
        marginTop: 40,
        // backgroundColor: "#ddd",
        alignSelf: "flex-end",
        flexDirection: "row",
    },
    buttonText: {
        // fontSize: 14,
        // color: "#FFFFFF",
        // fontWeight: '100',

        color: "#ededed",
        fontFamily: "Lato-Thin",
        fontSize: 18
    },
    buttonIcon: {
        width: 65,

        // backgroundColor: "#000",
        height: 20,
        resizeMode: "center"
    },
    buttonIconNext: {
        marginStart: 30,
    },
    buttonIconPrevious: {
        marginEnd: 30,

    },
});
