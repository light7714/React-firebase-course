import { useState, useEffect } from 'react';

//Custom hook to fetch data from a url
//as we will be fetching data quite often, we dont want to write the code for fetching data again and again (like earlier TripList comp)
//any hook has to start with use word, so react can process it
//slightly different approach than TripList
export const useFetch = (url) => {
	const [data, setData] = useState(null);

	//will run fn automatically when whatever comp uses this custom hook first evaluates
	//as we define this fetchData() inside useEffect, it is not external so we dont have to pass it to dependency array
	//when it isnt possible to do so, we define it outside and use useCallback
	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch(url);
			const json = await res.json();
			setData(json);
		};

		fetchData();
	}, [url]);

	// return { data: data }  OR
	return { data };
};
