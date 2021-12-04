import firebase from 'firebase/app';
import 'firebase/firestore';

//safe to expose these to public
const firebaseConfig = {
	apiKey: 'AIzaSyCdByXMODAeEJ9K_rTJaGSuHpLvAZL4-Bo',
	authDomain: 'cooking-ninja-site-295c9.firebaseapp.com',
	projectId: 'cooking-ninja-site-295c9',
	storageBucket: 'cooking-ninja-site-295c9.appspot.com',
	messagingSenderId: '982210952952',
	appId: '1:982210952952:web:8baa09db28d5969962450d',
};

//init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();

export { projectFirestore };
