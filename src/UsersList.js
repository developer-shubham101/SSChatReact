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
	Alert
} from 'react-native';

import firebase from 'react-native-firebase'
import CustomImage from './cusomComponents/CustomImage'
export default class UsersList extends React.Component {
	currentUser = firebase.auth().currentUser;

	constructor(props) {
		super(props);
		this.state = { list: [], images: {} }
	}
	componentDidMount() {

		var usersRef = firebase.database().ref("users");
		console.log(usersRef)
		usersRef.on('value', (snapshot) => {
			console.log(snapshot)
			snapshot.forEach((snap) => {3
				console.log("snaps")
				var item = snap.val();
                let image = item.dp ? item.dp : 'https://bootdey.com/img/Content/avatar/avatar6.png'
                let name = item.name ? item.name : item.email
				this.state.list.push({ email: item.email, userID: item.userID, image: image, name: name })
			});
		});

	}
	onClickListener = (viewId) => {
		if (viewId == "logout") {
			 
		} else {
			Alert.alert("Alert", "Button pressed " + viewId);
		}

	}
	openChatScreen = (object) => {
		console.log(object)
		this.props.navigation.navigate("Chat", {
			email: object.email,
			userID: object.userID

		})
	}
	goBack = () => {
		this.props.navigation.goBack();
	}
	 
	renderItem = ({ item }) => {
		return (
			<TouchableHighlight onPress={this.openChatScreen.bind(this, item)}>
				<View style={styles.row}>
					{/* <Image source={{ uri: item.image }} style={styles.pic} /> */}
					
					{/* <CustomImage src={ item.image } style={styles.pic} /> */}
					<View>
						<View style={styles.nameContainer}>
							<Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
							<Text style={styles.mblTxt}>Mobile</Text>
						</View>
						<View style={styles.msgContainer}>
							<Text style={styles.msgTxt}>{item.status}</Text>
						</View>
					</View>
				</View>
			</TouchableHighlight>
		);
	}
	render() {
		return (
			<View style={styles.container}>
				<FlatList
					extraData={this.state}
					data={this.state.list}
					renderItem={this.renderItem}

				/>
				{/* renderItem={({ item }) => <Text style={styles.item} onPress={this.openChatScreen.bind(this, item)} >{item.email}</Text>} */}
				


			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 22
	},
	item: {
		padding: 10,
		fontSize: 18,
		height: 44,
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
	},

	row: {
		flexDirection: 'row',
		alignItems: 'center',
		borderColor: '#DCDCDC',
		backgroundColor: '#fff',
		borderBottomWidth: 1,
		padding: 10,
	},
	pic: {
		borderRadius: 30,
		width: 60,
		height: 60,
	},
	nameContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: 280,
	},
	nameTxt: {
		marginLeft: 15,
		 
		color: '#222',
		fontSize: 14,
		width: 170,
	},
	mblTxt: {
		fontWeight: '200',
		color: '#777',
		fontSize: 13,
	},
	msgContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	msgTxt: {
		fontWeight: '400',
		color: '#008B8B',
		fontSize: 12,
		marginLeft: 15,
	},
});
