import { useState, useEffect } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

//when using fetch we can use abortController, when using real time firestore db we can use unsub fn. but here we need to do a more manual approach when cleaning up async fns.
export const useLogout = () => {
	const [isCancelled, setIsCancelled] = useState(false);
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const { dispatch } = useAuthContext();

	const logout = async () => {
		setError(null);
		setIsPending(true);

		// sign the user out (remember all this code instance runs for 1 user)
		try {
			await projectAuth.signOut();

			// dispatch logout action (payload is not specified as we want user to be null)
      //not putting this inside if(!isCancelled). Now if a comp using this hook unmounts, dispatch will change user state (in AuthContext), and all comps wrapped by AuthContext.Provider will re render. So I think it'll logout user and site will re render, and there is no prob of memory leak. (As we are not updating any state in a comp now, its the context provider thingy values we're updating)
			dispatch({
				type: 'LOGOUT',
			});

			// update state
      //only going to fire when isCancelled is false (when comp has not unounted suddenly)
			if (!isCancelled) {
				setError(null);
				setIsPending(false);
			}
		} catch (err) {
			if (!isCancelled) {
				console.log('Err in logout in useLogout:', err.message);
				setError(err.message);
				setIsPending(false);
			}
		}
	};

	//also need cleanup fns for logout(), so that if a comp using this useLogout hook unmounts (when a state is being updated), we need to clean up to ensure no memory leak
	//and cleanup fns live in useEffect
	useEffect(() => {
		return () => {
			setIsCancelled(true);
		};
	}, []);

	return { logout, error, isPending };
};
