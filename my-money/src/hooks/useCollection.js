//hook for subscribing to real time data from a firestore collection

import { useEffect, useState, useRef } from 'react';
import { projectFirestore } from '../firebase/config';

export const useCollection = (collection, _query, _orderBy) => {
	const [documents, setDocuments] = useState(null);
	const [error, setError] = useState(null);

	// _query is reference type (array) and being used in useEffect, to using useRef so that react doesnt see it as changed on a comp reevaluation
	// shaun's comments:
	// if we don't use a ref --> infinite loop in useEffect
	// _query is an array and is "different" on every function call

	const query = useRef(_query).current;
	const orderBy = useRef(_orderBy).current;

	//setting up real time listener to collection.
	// we want this to fire this right away, when the comp using this hook mounts, and also when collection changes (adding new doc in it for eg)
	useEffect(() => {
		let ref = projectFirestore.collection(collection);

		if (query) {
			// firebase where query
			// the query is (1st uid is property in document) : ref.where('uid', '==', user.uid)
			ref = ref.where(...query);
		}

		if (orderBy) {
			// firebase orderBy query
			// eg: orderBy("propertyName", "desc")
			ref = ref.orderBy(...orderBy);
		}

		//fires 1st arg fn everytime we get a snapshot from firestore collection. also get snapshot back once initially when we setup this connection
		//fires 3nd arg fn when there is an error
		const unsubscribe = ref.onSnapshot(
			(snapshot) => {
				let results = [];
				//snapshot.docs : an array of docs from the snapshot
				snapshot.docs.forEach((doc) => {
					// id != uid(user id), id is id of doc itself firestore added (adding so as to use it as a key prop when showing on UI)
					results.push({ ...doc.data(), id: doc.id });
				});

				//update state
				setDocuments(results);
				setError(null);
			},
			(error) => {
				console.log('err in onSnapshot() in useCollection:', error);
				setError('Could not fetch the data. Error msg:', error.message);
			}
		);

		//unsub on unmount
		return () => unsubscribe();
	}, [collection, query, orderBy]);

	return { documents, error };
};
