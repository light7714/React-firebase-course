import { useState, useEffect, useRef } from 'react';

//Custom hook to fetch data from a url
//as we will be fetching data quite often, we dont want to write the code for fetching data again and again (like earlier TripList comp)
//any hook has to start with use word, so react can process it
//slightly different approach than TripList

// rn we're passing a state (url) if a comp (TripList), which is then a useEffect dependency here.
// when not passing a state: for primitives everything is fine (strings, numbers, boolean, null, undefined)
// but when passing reference types (array, obj, fn), an infinite loop will run in useEffect. its cuz useEffect sees references types as changed values when a comp is reevaluated (WHY????), and its in dependency array, so useEffect wil rerun
// for functions, we can use useCallback
// for objs and arrays, we can 1. wrap them in a useState hook and then pass it as a state (as state values dont trigger infinite loop if we pass them in as dependency)
// 2. wrap the value in a useRef hook
export const useFetch = (url, _options) => {
	const [data, setData] = useState(null);

	//we shud show a loading or pending msg while fetch is occuring (as its async)
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);

	//useRef returns a mutable ref object whose .current property is initialized to the passed argument (initialValue). The returned object will persist for the full lifetime of the component.
	//the ref value (options here) is not seen different on each evaluation. so we passed options (not _options) in dependency array
	const options = useRef(_options).current

	//will run fn automatically when whatever comp uses this custom hook first evaluates
	//as we define this fetchData() inside useEffect, it is not external so we dont have to pass it to dependency array
	//when it isnt possible to do so, we define it outside and use useCallback
	useEffect(() => {
		console.log(options);

		//js abortController
		const controller = new AbortController();
		const fetchData = async () => {
			setIsPending(true);
			//catch runs only when there is network prob, not when url is wrong. So will check res.ok property and run catch manually
			try {
				//associates this fetch req with abort controller
				//when the req is aborted, fetch throws an abort error, which catch block will catch
				const res = await fetch(url, { signal: controller.signal });
				// console.log('Response:', res);
				//res.ok is false if we receive nothing (like url was wrong)
				if (!res.ok) {
					//will fire the catch block, res.statusText will be received by err in catch
					throw new Error(res.statusText);
				}
				const json = await res.json();

				setIsPending(false);
				setData(json);
				setError(null);
			} catch (err) {
				if (err.name === 'AbortError') {
					console.log('fetch was aborted');
				} else {
					setIsPending(false);
					setError('Could not fetch the data');
					console.log(err.message);
				}
			}
		};

		fetchData();

		//cleanup fn (see readme) is just a fn we return inside a (useEffect) hook, it'll always run when the comp using this useEffect hook unmounts.
		//if we were doing async tasks in a hook in comp itself, we would have made cleanup fn there (SEE MORE)
		//here we abort any async tasks or subscriptions to data streams
		return () => {
			//aborting the fetch req associated with our abort controller
			controller.abort();
		};
	}, [url, options]);

	// return { data: data }  OR
	return { data, isPending, error };
};
