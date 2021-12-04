import { useEffect, useState } from 'react';
import RecipeList from '../../components/RecipeList';

// import { useFetch } from '../../hooks/useFetch';
import { projectFirestore } from '../../firebase/config';

import './Home.css';

export default function Home() {
	// const { data, isPending, error } = useFetch(
	// 	'http://localhost:3000/recipes'
	// );

	const [data, setData] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		setIsPending(true);

		// 	//get() gets a snapshot of the whole collection. async fn, returns promise
		// 	projectFirestore
		// 		.collection('recipes')
		// 		.get()
		// 		.then((snapshot) => {
		// 			if (snapshot.empty) {
		// 				setError('No recipes to load!');
		// 				setIsPending(false);
		// 			} else {
		// 				let results = [];
		// 				snapshot.docs.forEach((doc) => {
		// 					results.push({ id: doc.id, ...doc.data() });
		// 				});
		// 				setData(results);
		// 				setIsPending(false);
		// 			}
		// 		})
		// 		.catch((err) => {
		// 			setError(err.message);
		// 			setIsPending(false);
		// 		});
		// }, []);

		//in the above method to fetch data, we're getting the data once. if a doc is deleted from the db, it will still show here till refresh.
		//solution is to use real time collection data; it sets up a listener to our collection, and when an event happens (like dlting data), firestore will send us a new snapshot.
		//we can listen to those snapshots in our app, and then we can match our local state with that snapshot

		//onSnapshot fires everytime theres a change in collection. 1st arg is the fn to fire, 2nd arg fires when there is an error
		//*it returns to us an unsubscribe fn
		//if comp unmounts and state is updated in b/w (setData), it'll try to update non existent comp. so we need to unsubscribe
		//now we return the cleanup fn in useEffect
		const unsub = projectFirestore.collection('recipes').onSnapshot(
			(snapshot) => {
				if (snapshot.empty) {
					setError('No recipes to load!');
					setIsPending(false);
				} else {
					let results = [];
					snapshot.docs.forEach((doc) => {
						results.push({ id: doc.id, ...doc.data() });
					});

					setData(results);
					setIsPending(false);
				}
			},
			(err) => {
				setError(err.message);
				setIsPending(false);
			}
		);

		return () => {
			unsub();
		};
	}, []);

	return (
		<div className="home">
			{error ? <p className="error">{error}</p> : null}
			{isPending ? <p className="loading">Loading...</p> : null}
			{data ? <RecipeList recipes={data} /> : null}
		</div>
	);
}
