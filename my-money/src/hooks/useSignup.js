import { useState, useEffect } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
	const [isCancelled, setIsCancelled] = useState(false);
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const { dispatch } = useAuthContext();

	//see useLogout for explanation on isCancelled and cleanup fn

	//firebase auth allows us to set display name on user (and some others, like photoUrl) (cant just set any property)
	const signup = async (email, password, displayName) => {
		//this here so that for eg a user signs up and there is an err (pw not long enf), then after correction signs up again, then the err needs to be null when we cann signup fn again
		setError(null);
		setIsPending(true);

		try {
			// signup user, logs user in automatically
			const res = await projectAuth.createUserWithEmailAndPassword(
				email,
				password
			);
			// console.log(res.user); //the user it just created

			//not getting any res (bad network for eg)
			if (!res) {
				throw new Error('Could not complete signup');
			}

			// add display name to user
			// await res.user.updateProfile({ displayName: displayName }); OR
			await res.user.updateProfile({ displayName });

			// dispatch login action
			dispatch({
				type: 'LOGIN',
				payload: res.user,
			});

			if (!isCancelled) {
				//WHY error null HERE??
				setError(null);
				setIsPending(false);
			}
		} catch (err) {
			if (!isCancelled) {
				console.log('err in signup() in useSignup:', err.message);
				setError(err.message);
				setIsPending(false);
			}
		}
	};

	useEffect(() => {
		return () => {
			setIsCancelled(true);
		};
	}, []);

	return { error, isPending, signup };
};
