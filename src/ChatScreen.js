import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TextInput,
    Button,
    TouchableHighlight,
    Image,
    Dimensions,
    Alert,
    KeyboardAvoidingView
} from 'react-native';
import firebase from 'react-native-firebase'
const { width, height } = Dimensions.get('window');

 
export default class ChatScreen extends React.Component {
    currentUser = firebase.auth().currentUser;
    constructor(props) {
        super(props);
        this.state = { list: [], message: "", userID: 'NO-ID' }

        this.renderItem = this._renderItem.bind(this);
         
        const { navigation } = this.props;
        const userID = navigation.getParam('userID', 'NO-ID');
        this.state.userID = userID
        // Alert.alert("Alert", this.state.userID);
        this.chatRef = firebase.database().ref("chat/" + this.fetchLower(userID, this.currentUser.uid));
    }
    chatRef;
    fetchLower (str1, str2){
        if (str1.localeCompare(str2) < 0) {
            return str1 + "_" + str2
        }else{
            return str2 + "_" + str1
        } 
    }
    componentDidMount() {
       
        this.chatRef.on('child_added', (snapshot) => {
            var item = snapshot.val();
            let oldList = this.state.list;
            oldList.push({ message: item.message, sent: (item.userID == this.currentUser.uid) });
            this.setState({ list: oldList })
        });
    }
    onClickListener = (viewId) => {
        if (viewId == "send") {
            if (this.state.message != "") {
                this.chatRef.push({
                    "message": this.state.message,
                    "userID": this.currentUser.uid
                });
                this.state.message = ""
            }
        } else {
            Alert.alert("Alert", "Button pressed " + viewId);
        }

    }
    openChatScreen = (object) => {
        console.log(object)
    }
    goBack = () => {
        this.props.navigation.goBack();
    }
    _renderItem = ({ item }) => {
        console.log(item)
        if (item.sent === false) {
            return (
                <View style={styles.eachMsg}>
                     
                    <View style={styles.msgBlock}>
                        <Text style={styles.msgTxt}>{item.message}</Text>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={styles.rightMsg} >
                    <View style={styles.rightBlock} >
                        <Text style={styles.rightTxt}>{item.message}</Text>
                    </View>
                     
                </View>
            );
        }
    };

    //renderItem={({ item }) => <Text style={styles.item} onPress={this.openChatScreen.bind(this, item)} >{item.key}</Text>}
    render() {
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView behavior="padding" style={styles.keyboard}>
                    <View style={styles.messageList}>
                        <FlatList
                            data={this.state.list}
                            extraData={this.state}
                            renderItem={this.renderItem}

                        />
                    </View>
                    <View style={styles.bottomContainer}>
                        <View style={styles.inputContainer}>
                            <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db' }} />
                            <TextInput style={styles.inputs}
                                placeholder="Enter message"
                                underlineColorAndroid='transparent'
                                value={this.state.message}
                                onChangeText={(message) => this.setState({ message })} />
                        </View>
                        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('send')}>
                            <Text style={styles.loginText}>Send</Text>
                        </TouchableHighlight>
                    </View>
                </KeyboardAvoidingView>

            </View>
        );
    }
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: 22,
        backgroundColor: '#FAFAFD'
    },

    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    inputContainer: {
        borderBottomColor: '#ddd',
        backgroundColor: '#FFFFFF',
        borderRadius: 0,
        borderBottomWidth: 1,
        height: 45,
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center'
    },
    bottomContainer: {
        width: '100%',
        height: 45,
        marginBottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 0,
        flex: 1

    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 0,
        flex: 1

    },
    loginButton: {
        backgroundColor: "#00b5ec",
    },
    loginText: {
        color: 'white',
    },



    ////


    keyboard: {
        flex: 1 
    },
    image: {
        width,
        height,
    },
    header: {
        height: 65,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#075e54',
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    right: {
        flexDirection: 'row',
    },
    chatTitle: {
        color: '#fff',
        fontWeight: '600',
        margin: 10,
        fontSize: 15,
    },
    chatImage: {
        width: 30,
        height: 30,
        borderRadius: 15,
        margin: 5,
    },
    messageList: {
        flex: 3,
    },
    input: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        padding: 10,
        height: 40,
        width: width - 20,
        backgroundColor: '#fff',
        margin: 10,
        shadowColor: '#3d3d3d',
        shadowRadius: 2,
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 1,
        },
        borderColor: '#696969',
        borderWidth: 1,
    },
    eachMsg: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        margin: 5,
    },
    rightMsg: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        margin: 5,
        alignSelf: 'flex-end',
    },
    userPic: {
        height: 40,
        width: 40,
        margin: 5,
        borderRadius: 20,
        backgroundColor: '#f8f8f8',
    },
    msgBlock: {
        width: '80%',
        borderRadius: 5,
        backgroundColor: '#ffffff',
        padding: 10,
        shadowColor: '#3d3d3d',
        shadowRadius: 2,
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 1,
        },
    },
    rightBlock: {
        width: '80%',
        borderRadius: 3,
        backgroundColor: '#0F84FE',
        padding: 10,
        shadowColor: '#0F84FE',
        shadowRadius: 2,
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 1,
        },
    },
    msgTxt: {
        fontSize: 15,
        color: '#555',
        fontWeight: '600',
    },
    rightTxt: {
        fontSize: 15,
        color: '#fff',
        fontWeight: '600',
    },
});
