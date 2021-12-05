import { createContext, useReducer } from 'react';

export const AuthContext = createContext();

//exporting this just in case we use it in another file (??)
export const authReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			return { ...state, user: action.payload };

		default:
			return state;
	}
};

//global context, so children is the app comp
export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, {
		user: null,
	});

  console.log('AuthContext state:', state);

	return (
		//provider of the context
		//putting dispatch fn also in value prop to provider so that in future when we wanna log in or out in other comps, we can use dispatch inside those comps directly to update our context value
		<AuthContext.Provider value={{ ...state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};
