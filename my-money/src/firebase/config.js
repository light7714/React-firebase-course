import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyClkleLrYtjGKkH9Sr5kwXE90No30AYrD4',
	authDomain: 'mymoney-7fe48.firebaseapp.com',
	projectId: 'mymoney-7fe48',
	storageBucket: 'mymoney-7fe48.appspot.com',
	messagingSenderId: '848075972931',
	appId: '1:848075972931:web:35c7c21d9b63c134604ff6',
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

// timestamp
//timestamp fn when invoked (like timestamp.fromDate()) created a firebase timestamp data type
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp };
