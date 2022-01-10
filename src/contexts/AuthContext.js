import React, { createContext } from "react";

import firebase from "firebase/app";

import "firebase/auth";

import { useHistory } from 'react-router';

export const AuthContext = createContext();

function AuthContextProvider(props) {
	const [isLogin, setIsLogin] = React.useState(false);
	const [currUser, setCurrUser] = React.useState({});

	var history = useHistory();

	const login = (creds) => {
		console.log('Logging in: ', Date.now());

		firebase
			.auth()
			.signInWithEmailAndPassword(creds.user, creds.pass)
			.then((userCredential) => {
				console.log('User credentials: ', userCredential);
				setCurrUser(userCredential.user);
				setIsLogin(true);
				history.push('/');
			})
			.catch((e) => {
				console.log('Error in firebase auth: ', e);
				setCurrUser({});
				setIsLogin(false);
			});
	};

	const logout = () => {
		console.log('Logged out: ', Date.now());
		firebase.auth().signOut();
		setIsLogin(false);
		setCurrUser({});
	};

	React.useEffect(() => {
		// For Firebase JS SDK v7.20.0 and later, measurementId is optional
		const firebaseConfig = {
			apiKey: 'AIzaSyAbI28Bze1i9YEe809JKZTD0WusYnW4O4M',
			authDomain: 'healthfy-97c5c.firebaseapp.com',
			projectId: 'healthfy-97c5c',
			storageBucket: 'healthfy-97c5c.appspot.com',
			messagingSenderId: '788646882926',
			appId: '1:788646882926:web:209bf314eeb54194acc07f',
			measurementId: 'G-C3B2F7MTDP',
		};
		firebase.initializeApp(firebaseConfig);
	}, []);

	// React.useEffect(() => {
	// 	// let currentUser = firebase.auth().currentUser;
	// 	// // console.log("Current user: ", currentUser);
	// 	// if (currentUser) {
	// 	// 	setCurrUser(currentUser);
	// 	// }
	// 	let sessionId = document.cookie.split("=")[1];
	// 	fetch("http://127.0.0.1:5000/api/session_logout", {
	// 		mode: "cors",
	// 	})
	// 		.then((resp) => resp.json())
	// 		.then((body) => {
	// 			console.log(body);
	// 			setIsLogin(body.verified);
	// 		});
	// }, []);

	return (
		<AuthContext.Provider value={{ isLogin, currUser, login, logout }}>
			{props.children}
		</AuthContext.Provider>
	);
}

export default AuthContextProvider;
