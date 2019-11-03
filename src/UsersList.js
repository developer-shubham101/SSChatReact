import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	TextInput,
	Button,
	SafeAreaView,
	TouchableOpacity,
	Image,
	Alert
} from 'react-native';

import appStyles, { colors, appColors } from './styles/common/index.style';
import firebase from 'react-native-firebase'
import CustomImage from './cusomComponents/CustomImage'
export default class UsersList extends React.Component {
	currentUser = firebase.auth().currentUser;

	db = firebase.firestore();

	constructor(props) {
		super(props);
		this.state = { list: [], images: {} }
	}
	componentDidMount() {
		// Call our async function in a try block to catch connection errors.
		try {
			this.loadUsers();
		}
		catch (err) {
			console.log('Error getting documents', err)
		}
	}

	/* async loadUsersWithAsync() {
		var tmpUserList = [];
		var tmpUserIdList = [];

		let threadsCollection = this.db.collection("threads");
		let userKey = await threadsCollection.where("users", "array-contains", this.currentUser.uid).get();
		userKey.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			console.log(doc.id, " => ", doc.data());
			var item = doc.data();
			let otherUserId = item.users.filter((element) => {
				return element != this.currentUser.uid
			});
			tmpUserIdList.push({ otherUserId: otherUserId[0], docId: doc.id, threadData: doc.data() });
		});

		console.log("tmpUserIdList", tmpUserIdList);

		var queries = this.db.collection("users");


		for (elementX of tmpUserIdList) {
			console.log("key => ", elementX);
			let key = elementX.otherUserId;

			let doc = await queries.doc(key).get();
			console.log(doc);
			console.log("item.threadData", elementX.threadData);

			if (doc.id != this.currentUser.uid) {
				var item = doc.data();
				let image = item.dp ? item.dp : 'https://bootdey.com/img/Content/avatar/avatar6.png';
				let name = item.name ? item.name : item.email;

				var listOfUsers = this.state.list;

				listOfUsers.push({
					docId: elementX.docId,
					email: item.email,
					userID: item.userID,
					image: image,
					name: name,
					threadData: elementX.threadData
				});
				this.setState(listOfUsers);
			}
		} 

	} */

	loadUsers() {
		var queries = this.db.collection("users");
		let threadsCollection = this.db.collection("threads");
		threadsCollection.where("users", "array-contains", this.currentUser.uid).onSnapshot(async (docSnapshot) => {
			console.log(`Received doc snapshot: `, docSnapshot.docChanges);

			for (change of docSnapshot.docChanges) {
				let changeDoc = change.doc;
				console.log("change", change);
				if (change.type === 'added') {

					console.log(changeDoc.id, " => ", changeDoc.data());
					var item = changeDoc.data();
					let otherUserId = item.users.filter((element) => {
						return element != this.currentUser.uid
					});

					elementX = { otherUserId: otherUserId[0], docId: changeDoc.id, threadData: changeDoc.data() };

					console.log("key => ", elementX);
					let key = elementX.otherUserId;

					let doc = await queries.doc(key).get();
					console.log("docSnapshot => ", doc);
					console.log(doc);
					console.log("item.threadData", elementX.threadData);

					if (doc.id != this.currentUser.uid) {
						var item = doc.data();
						let image = item.dp ? item.dp : 'https://bootdey.com/img/Content/avatar/avatar6.png';
						let name = item.name ? item.name : item.email;

						var listOfUsers = this.state.list;

						listOfUsers.push({
							docId: elementX.docId,
							email: item.email,
							userID: item.userID,
							image: image,
							name: name,
							threadData: elementX.threadData
						});
						this.setState(listOfUsers);
					}
				}
				if (change.type === 'modified') {
					console.log('Modified city: ', change.doc.data());

					var listOfUsers = this.state.list;

					for (i = 0; i < listOfUsers.length; i++) {
						if (listOfUsers[i].docId == changeDoc.id) {
							listOfUsers[i].threadData = changeDoc.data();
						}
					}
					this.setState(listOfUsers);


				}
				if (change.type === 'removed') {
					console.log('Removed city: ', change.doc.data());
				}
			}
		});
	}
	onClickListener = (viewId) => {
		if (viewId == "logout") {

		} else {
			Alert.alert("Alert", "Button pressed " + viewId);
		}

	}
	openChatScreen = (object) => {
		console.log(object);


		// threadsCollection.add({
		// 	users: [object.userID, this.currentUser.uid],
		// 	lastMessage: "",
		// 	lastMessageTime: new Date(),
		// }).then(function (docRef) {
		// 	console.log("Document written with ID: ", docRef.id);
		// }).catch(function (error) {
		// 	console.error("Error adding document: ", error);
		// });

		this.props.navigation.navigate("Chat", {
			email: object.email,
			userID: object.userID,
			docId: object.docId

		});
	}
	goBack = () => {
		this.props.navigation.goBack();
	}
	openAllUserList() {
		// console.log("open all user list");
		this.props.navigation.navigate("AllUsersList", {
			userList: this.state.list
		});
	}
	renderItem = ({ item }) => {
		return (

			<TouchableOpacity
				activeOpacity={0.7}
				onPress={this.openChatScreen.bind(this, item)}>
				<View style={styles.row}>
					{/* <Image source={{ uri: item.image }} style={styles.pic} /> */}

					<CustomImage src={item.image} iconStyle={styles.pic} />
					<View style={styles.rowContentWrapper}>
						<View style={styles.nameContainer}>
							<Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
							<Text style={styles.mblTxt}>Online</Text>
						</View>
						<View style={styles.msgContainer}>
							<Text style={styles.msgTxt}> {item.threadData.lastMessage}</Text>
						</View>
					</View>
				</View>
			</TouchableOpacity>

		);
	}
	render() {
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<View style={styles.toolbarWrapper}>
					<TouchableOpacity
						activeOpacity={0.7}
						onPress={() => { this.openAllUserList() }}>
						<Text style={styles.toolbarTitle}>USERS (+)</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.container}>
					<FlatList
						extraData={this.state}
						data={this.state.list}
						renderItem={this.renderItem}

					/>
				</View>
			</SafeAreaView>
		);
	}
}
const styles = StyleSheet.create({
	toolbarWrapper: {
		height: 60,
		backgroundColor: appColors.bgColor
	},

	toolbarTitle: {

		color: "#d9983d",
		fontFamily: "IntroCondLightFree",
		marginTop: 30,
		marginStart: 20,
		fontSize: 30
	},

	container: {
		backgroundColor: appColors.bgColor,
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

	rowContentWrapper: {
		flexDirection: "column",

		flex: 1,
	},
	row: {
		// backgroundColor: "#ddd",
		marginStart: 30,
		flexDirection: 'row',
		alignItems: 'center',
		borderColor: '#121212',
		borderBottomWidth: 1,
		paddingTop: 10,
		paddingBottom: 10,

	},
	pic: {
		marginEnd: 10,
		borderRadius: 30,
		width: 40,
		height: 40,
	},
	nameContainer: {
		flexDirection: 'row',
		// justifyContent: 'space-between',

	},
	nameTxt: {

		flex: 1,
		color: '#222',
		fontSize: 14,
		flex: 1,
		color: "#c4c4a1",

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

	},
});
