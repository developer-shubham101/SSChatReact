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
import Toast, { DURATION } from 'react-native-easy-toast';

import appStyles, { colors, appColors } from './styles/common/index.style';
import firebase from 'react-native-firebase'
import CustomImage from './cusomComponents/CustomImage'
export default class AllUsersListForGroup extends React.Component {
	currentUser = firebase.auth().currentUser;

	db = firebase.firestore();

	constructor(props) {
		super(props);
		this.state = { list: [], images: {}, userList: [], isSelectUser: true, groupName: "", selectedUsersForGroup: [] }
	}
	componentDidMount() {
		// const instance = firebase.initializeApp({
		// 	persistence: true
		// });

		const userList = this.props.navigation.getParam('userList', []);
		this.setState({ userList: userList });

		let usersDb = this.db.collection("users");

		usersDb.get().then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				// doc.data() is never undefined for query doc snapshots
				console.log(doc.id, " => ", doc.data());
				if (doc.id != this.currentUser.uid) {
					var item = doc.data();
					let image = item.dp ? item.dp : 'https://bootdey.com/img/Content/avatar/avatar6.png';
					let name = item.name ? item.name : item.email;

					var listOfUsers = this.state.list;

					listOfUsers.push({ email: item.email, userID: item.userID, image: image, name: name, isSelected: false });
					this.setState(listOfUsers);

				}
			});
		});


		/* var usersRef = firebase.database().ref("users");
		console.log(usersRef)
		usersRef.on('value', (snapshot) => {
			console.log(snapshot)
			snapshot.forEach((snap) => {

				console.log("snaps", snap);
				// console.log(snap);
				if (snap.key != this.currentUser.uid) {
					var item = snap.val();
					let image = item.dp ? item.dp : 'https://bootdey.com/img/Content/avatar/avatar6.png';
					let name = item.name ? item.name : item.email;

					var listOfUsers = this.state.list;

					listOfUsers.push({ email: item.email, userID: item.userID, image: image, name: name });
					this.setState(listOfUsers);

				}
			});
		}); */

		/* var db = firebase.firestore();

		// Add a second document with a generated ID.
		db.collection("users").add({
			first: "Alan",
			middle: "Mathison",
			last: "Turing",
			born: 1912
		}).then(function (docRef) {
			console.log("Document written with ID: ", docRef.id);
		}).catch(function (error) {
			console.error("Error adding document: ", error);
		}); */


		// // Add collection by doc id
		// db.collection("users").doc("userss1").set({
		// 	first: "Alanasd",
		// 	middle: "Mathison",
		// 	last: "Turing",
		// 	born: 1912
		// }).then(function () {
		// 	console.log("Collection saved successfully.");
		// }).catch(function (error) {
		// 	console.error("Error adding collection: ", error);
		// });


	}
	onClickListener = (viewId) => {
		if (viewId == "CreateGroup") {
			var listOfUsers = this.state.list;
			var selectedUsers = listOfUsers.filter((element) => {
				return element.isSelected;
			});
			if (selectedUsers.length == 0) {
				this.refs.toast.show('Please select users');
			} else {
				this.setState({ isSelectUser: false, selectedUsersForGroup: selectedUsers });
				console.log(selectedUsers);
			}


		} else if (viewId == "SelectUsers") {
			this.setState({ isSelectUser: true });
		} else if (viewId == "CreateNewGroup") {

			if (this.state.groupName == "") {
				this.refs.toast.show('Please enter group name');
			} else {
				console.log(this.state.groupName);
				console.log(this.state.selectedUsersForGroup);



				var userIdList = [this.currentUser.uid];

				for (let element of this.state.selectedUsersForGroup){
					// console.log(element.userID);
					userIdList.push(element.userID)
				}

				let threadsCollection = this.db.collection("threads");
				threadsCollection.add({
					users: userIdList,
					lastMessage: "",
					lastMessageTime: new Date(),
					isGroup: true,
					groupName: this.state.groupName
				}).then(function (docRef) {
					console.log("Document written with ID: ", docRef.id);
				}).catch(function (error) {
					console.error("Error adding document: ", error);
				});


			}
		} else {
			Alert.alert("Alert", "Button pressed " + viewId);
		}

	}


	openChatScreen = (object, index) => {
		// console.log(object);
		// console.log(index);

		var listOfUsers = this.state.list;
		listOfUsers[index].isSelected = !listOfUsers[index].isSelected;
		this.setState(listOfUsers);

		// let isThreadExist = this.state.userList.some((element) => {
		// 	return element.userID == object.userID;
		// });
		// console.log("isThreadExist => ", isThreadExist);
		// if (!isThreadExist) {
		// 	let threadsCollection = this.db.collection("threads");
		// 	threadsCollection.add({
		// 		users: [object.userID, this.currentUser.uid],
		// 		lastMessage: "",
		// 		lastMessageTime: new Date(),
		// 	}).then(function (docRef) {
		// 		console.log("Document written with ID: ", docRef.id);
		// 	}).catch(function (error) {
		// 		console.error("Error adding document: ", error);
		// 	});
		// }



		// this.props.navigation.navigate("Chat", {
		// 	email: object.email,
		// 	userID: object.userID

		// })
	}
	goBack = () => {
		this.props.navigation.goBack();
	}

	renderItem = ({ item, index }) => {
		return (

			<TouchableOpacity
				activeOpacity={0.7}
				onPress={this.openChatScreen.bind(this, item, index)}>
				<View style={styles.row}>
					{/* <Image source={{ uri: item.image }} style={styles.pic} /> */}

					<CustomImage src={item.image} iconStyle={styles.pic} />
					<View style={styles.rowContentWrapper}>
						<View style={styles.nameContainer}>
							<Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
							<Text style={styles.mblTxt}>{item.isSelected ? "select" : "Unselect"}</Text>
						</View>
						<View style={styles.msgContainer}>
							<Text style={styles.msgTxt}>Online{/* item.status */}</Text>
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
					<Text style={styles.toolbarTitle}>SELECT USERS</Text>
					<TouchableOpacity
						activeOpacity={0.7}
						onPress={() => { this.onClickListener("CreateGroup") }}>
						<Text style={styles.toolbarTitle}>Go</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.container}>
					{this.state.isSelectUser ?
						<FlatList
							extraData={this.state}
							data={this.state.list}
							renderItem={this.renderItem}
						/>
						: <View>
							<View style={styles.inputContainer}>
								{/* <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db' }} /> */}
								<TextInput style={styles.inputs}
									ref='GroupName'
									placeholderTextColor="#999797"
									returnKeyType={"done"}
									placeholder="Group Name"


									underlineColorAndroid='transparent'
									onChangeText={(groupName) => this.setState({ groupName: groupName })}
									onSubmitEditing={(event) => { this.onClickListener('CreateNewGroup') }}
								/>
							</View>

							<TouchableOpacity
								activeOpacity={0.7}
								style={[styles.buttonContainer, styles.loginButtonContainer]}
								onPress={() => this.onClickListener('CreateNewGroup')}>

								<Text style={styles.buttonText}>CREATE</Text>
								<Image style={styles.loginIcon} source={require("./../assets/img/ic_short_next.png")} />
							</TouchableOpacity>
							<TouchableOpacity
								activeOpacity={0.7}
								style={[styles.buttonContainer, styles.regButtonContainer]}
								onPress={() => this.onClickListener('SelectUsers')}>
								<Text style={[styles.buttonText, styles.registerButtonText]}>SELECT USERS</Text>
								<Image style={styles.regIcon} source={require("./../assets/img/ic_long_next.png")} />
							</TouchableOpacity>
						</View>}

				</View>
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
	toolbarWrapper: {
		height: 60,
		backgroundColor: appColors.bgColor,
		flexDirection: 'row'
	},

	toolbarTitle: {

		color: "#d9983d",
		fontFamily: "Lato-Thin",
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
		fontFamily: "Lato-Thin"
	},
	buttonContainer: {
		marginStart: 70,
		flexDirection: "row",

	},
	regButtonContainer: {
		marginTop: 20
	},
	buttonText: {
		color: "#ededed",
		fontFamily: "Lato-Thin",
		fontSize: 18
	},
	loginIcon: {
		width: 45,
		marginStart: 30,
		// backgroundColor: "#000",
		height: 20,
		resizeMode: "center"
	},
	regButtonContainer: {
		marginTop: 20
	},
	regIcon: {
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
