import { createContext, useReducer, useEffect } from 'react';
import { projectAuth } from '../firebase/config';

export const AuthContext = createContext();

//exporting this just in case we use it in another file (??)
export const authReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			return { ...state, user: action.payload };

		case 'LOGOUT':
			return { ...state, user: null };

		case 'AUTH_IS_READY':
			return { ...state, user: action.payload, authIsReady: true };

		default:
			return state;
	}
};

//global context, so children is the app comp
export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, {
		user: null,
		authIsReady: false,
	});

	//when we refresh page after logging in, we see on ui as logged out, but if we were to send a req to firebase to check, we would see we are still logged in (jwt would be there). Its bcoz on refreshing, we are updating our authContext state (user) as null. We should, before rendering any comps, check with firebase if there's jwt thats valid for the user, if it is, we show logged in, else show logged out content.

	//firing this code only for 1st time our application loads (refresh)
	useEffect(() => {
		//onAuthStateChange() takes arg a fn which is fired when there is an auth change
		//that fn takes an arg which is the user is user has just logged in, or is null when user has just logged out

		//whenever a user logs in or out, the state changes using dispatch, so all comps inside authcontextprovider rerender, and so does this code (I GUESS ??), and therefore, so does this useEffect. We only need to do this once initially, and not everytime
		//thats why we unsubscribe from this listener after initial check

		//OR maybe this onAuthStateChanged observer does not automatically unsubscribes, this always fires in the back when user logs in or out.

		const unsub = projectAuth.onAuthStateChanged((user) => {
			dispatch({
				type: 'AUTH_IS_READY',
				payload: user,
			});
			unsub();
		});
	}, []);

	console.log('AuthContext state:', state);

	return (
		//provider of the context
		//putting dispatch fn also in value prop to provider so that in future when we wanna log in or out in other comps, we can use dispatch inside those comps directly to update our context value
		<AuthContext.Provider value={{ ...state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};
