import './TripList.css';

// import { useState, useEffect, useCallback } from 'react';
import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';

//This is one way using useCallback, another way is in the custom hook useFetch, both are imp

// //When we try to fetch data and update state directly: react re renders this comp after state is changed, thus fetch will run again, will change state again, will re run and infinite loop will go on.
// export default function TripList() {
// 	const [trips, setTrips] = useState([]);
// 	const [url, setUrl] = useState('http://localhost:3000/trips');

//   //useCallback created a cached version of a fn, and on every evaluation of the component, that cached fn is not being recreated, and so not seen as changed by useEffect
//   //also has dependency array, tells it when to create new version of function inside it
//   //so when we click btn and change the url, this fn doesnt change, and so the url variable inside it also doesnt change, and it will fetch old data. so when we pass url as a dependency, any time the url changes, useCallback will make a new version of this fn
// 	const fetchTrips = useCallback(async () => {
//     const response = await fetch(url);
//     const json = await response.json();
//     setTrips(json);
//   }, [url])

// 	//1st arg is a fn, 2nd is dependency array
// 	//when comp is evaluated the 1st time, useEffect will automatically run 1st arg fn, so here we can perform some side effect like fetch data and update state
// 	//when comp is reevaluated, useEffect fn will only run is any of its dependencies have changed value since the last eval.
// 	//here, as dependency array is empty, the fn will only run once
// 	//note: the 1st arg fn to useEffect can't be async (as it might cause probs when we use this hook, as the fn inside it will run later..). so we cant write async keyword and use await inside it (can nest async fns here and invoke them if u want)
// 	// useEffect(() => {
// 	// 	// //we're using a dynamic value (url) inside useEffect, so we shud declare it as a dependency (or else warning), as when the value changes, we shud expect inside fn to rerun
// 	// 	fetch(url)
// 	// 		.then((response) => response.json())
// 	// 		.then((json) => setTrips(json));
// 	// }, [url]);

//   //this time it'll run in an infinte loop. On reevaluation of this fn, all variables are newly created.

//   //we are changing objects using the useState hook. for eg the url and trips is changed using useState, and not changed directly. So in a new render, that old url is changed only and a new url variable is not being created (I GUESS), so it doesnt go in infinite loop. But on a new render, the fetchTrips fn is newly created (without useState) so when useEffect compares the 2 fns, they are not equal and it runs again, in an infinite loop
//   //so we use useCallback hook
//   //when the url changes (on clicking btn) and a new fetchTrips fn is generated due to url being dependency in useCallback, that is going to trigger the useEffect fn to run. On other times when url is not changed, new fetchTrips fn is not generated as useCallback makes a cached version of that fetchTrips
//   useEffect(() => {
//     fetchTrips();
//   }, [fetchTrips])

// 	//first empty array will be logged (as useEffect is asynchronous), and trips arr will be logged once
// 	console.log(trips);

// 	return (
// 		<div className="trip-list">
// 			<h2>Trip List</h2>
// 			<ul>
// 				{trips.map((trip) => (
// 					<li key={trip.id}>
// 						<h3>{trip.title}</h3>
// 						<p>{trip.price}</p>
// 					</li>
// 				))}
// 			</ul>
// 			<div className="filters">
// 				<button
// 					onClick={() =>
// 						setUrl('http://localhost:3000/trips?loc=europe')
// 					}
// 				>
// 					European Trips
// 				</button>
// 				<button onClick={() => setUrl('http://localhost:3000/trips')}>
// 					All Trips
// 				</button>
// 			</div>
// 		</div>
// 	);
// }

export default function TripList() {
	const [url, setUrl] = useState('http://localhost:3000/trips');
	//we are calling this data as trips
	const { data: trips } = useFetch(url);

	return (
		<div className="trip-list">
			<h2>Trip List</h2>
			<ul>
				{trips
					? trips.map((trip) => (
							<li key={trip.id}>
								<h3>{trip.title}</h3>
								<p>{trip.price}</p>
							</li>
					  ))
					: null}
			</ul>
			<div className="filters">
				<button
					onClick={() =>
						setUrl('http://localhost:3000/trips?loc=europe')
					}
				>
					European Trips
				</button>
				<button onClick={() => setUrl('http://localhost:3000/trips')}>
					All Trips
				</button>
			</div>
		</div>
	);
}
