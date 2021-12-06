import { useReducer, useEffect, useState } from 'react';
import { projectFirestore, timestamp } from '../firebase/config';

//we usually use useReducer instead of useState of complex states and complex ways of updating them
//document will store the document reference
let initialState = {
	document: null,
	isPending: false,
	success: null,
	error: null,
};

const firestoreReducer = (state, action) => {
	switch (action.type) {
		case 'IS_PENDING':
			return {
				document: null,
				isPending: true,
				success: false,
				error: null,
			};
		case 'ADDED_DOCUMENT':
			// just in case there was an err previously, resetting error also
			return {
				document: action.payload,
				isPending: false,
				success: true,
				error: null,
			};
		case 'DELETED_DOCUMENT':
			return {
				isPending: false,
				document: null,
				success: true,
				error: null,
			};
		case 'ERROR':
			return {
				document: null,
				isPending: false,
				success: false,
				error: action.payload,
			};

		default:
			return state;
	}
};

export const useFirestore = (collection) => {
	// 'response' is a custom obj that kind of represents the res we get back from firestore. response will contain our own variables
	// initialState and firestoreReducer is outside of hook as we dont need new copy of it everytime hook is used
	const [response, dispatch] = useReducer(firestoreReducer, initialState);

	// see explanation on useSignup
	const [isCancelled, setIsCancelled] = useState(false);

	// ref to collection (if not made already, it'll automatically make one)
	const ref = projectFirestore.collection(collection);

	//only dispatch if not cancelled
	const dispatchIfNotCancelled = (action) => {
		if (!isCancelled) {
			dispatch(action);
		}
	};

	// add a document
	//(doc will have name, amount and uid properties for transactions collection)
	const addDocument = async (doc) => {
		dispatchIfNotCancelled({ type: 'IS_PENDING' });

		try {
			//takes current date&time
			const createdAt = timestamp.fromDate(new Date());

			//returns a doc ref to the doc we just added
			const addedDocument = await ref.add({
				...doc,
				createdAt: createdAt,
			});

			dispatchIfNotCancelled({
				type: 'ADDED_DOCUMENT',
				payload: addedDocument,
			});
		} catch (err) {
			dispatchIfNotCancelled({ type: 'ERROR', payload: err.message });
		}
	};

	// delete a document
	const deleteDocument = async (id) => {
		// this should be dispatchifnotcancelled .???????
		dispatchIfNotCancelled({ type: 'IS_PENDING' });

		try {
			await ref.doc(id).delete();
			dispatchIfNotCancelled({
				type: 'DELETED_DOCUMENT',
			});
		} catch (err) {
			dispatchIfNotCancelled({ action: 'ERROR', payload: err.message });
		}
	};

	//cleanup fn, setIsCancelled(true) fires if a comp using this hook unmounts, as we dont eanna update any local state when that happens
	//fires once when a comp using this hook first mounts
	useEffect(() => {
		return () => {
			setIsCancelled(true);
		};
	}, []);

	return { addDocument, deleteDocument, response };
};
