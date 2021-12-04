import { useState, useEffect } from 'react';

export const useFetch = (url, method = 'GET') => {
	const [data, setData] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);
	const [options, setOptions] = useState(null);

	const postData = (postData) => {
		setOptions({
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(postData),
		});
	};

	useEffect(() => {
		const controller = new AbortController();

		const fetchData = async (fetchOptions) => {
			setIsPending(true);

			try {
				const res = await fetch(url, {
					...fetchOptions,
					signal: controller.signal,
				});
				if (!res.ok) {
					throw new Error(res.statusText);
				}
				const data = await res.json();

				setIsPending(false);
				setData(data);
				setError(null);
			} catch (err) {
				if (err.name === 'AbortError') {
					console.log('the fetch was aborted');
				} else {
					setIsPending(false);
					setError('Could not fetch the data');
				}
			}
		};

		if (method === 'GET') {
			fetchData();
		}

		// we wanna do smthing for post req only after setOptions() completed in postData()
		if (method === 'POST' && options) {
			// will only run when somewhere else the postData(options) fn is run
			fetchData(options);
		}

		return () => {
			controller.abort();
		};
		// need to include options as dependency as we're using it in useEffect, it depends on postData in postData(), and we're getting postData from outside
	}, [url, method, options]);

	return { data, isPending, error, postData };
};
