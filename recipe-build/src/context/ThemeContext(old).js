import { createContext, useReducer } from 'react';

//export the context obj
export const ThemeContext = createContext();

//context provider comp can also be used in index.js, we can wrap any part of our components to provide it with value of the context

//outside the comp so as to not recreate it everytime
//reducer fn takes 2 args when called using dispatch fn, the current state and the dispatch action
//we return value that represents the new state
const themeReducer = (state, action) => {
	//checking the type of state change we wanna make and return updated state based on that
	switch (action.type) {
		case 'CHANGE_COLOR':
			// rn its only color property, but in future there might be more
			return { ...state, color: action.payload };
		default:
      //unchanged state
			return state;
	}
};

//context provider wraps our application (for global context)
//this fn is a react comp
//children prop represents any children comps that this comp might have, so we can render those children inside this comp
export function ThemeProvider({ children }) {
	//allows us to specify a reducer fn as 1st arg, where logic for updating states is kept at one place. 2nd arg is initial state value, returned in state obj, 2nd arg returned is dispatch fn
	//dispatch fn is way to dispatch a state change to the reducer fn. so when we wanna call the reducer fn to change our state, we do it using dispatch fn
	const [state, dispatch] = useReducer(themeReducer, {
		color: '#58249c',
	});

	const changeColor = (color) => {
		//takes obj called dispatch action as arg, with type and payload properties.
		// type describes type of change we wanna make. usually its a capital string
		//payload is any data we wanna the base the state change on
    //this will make the reducer fn associated with it run (themeReducer)
		dispatch({ type: 'CHANGE_COLOR', payload: color });
	};

	//we're doing it this way instead of just wrapping App comp inside ThemeContext comp in index.js, as we can write custom logic here. Can keep track of values passed in context provider, and also change them

	return (
		// the value passed into comp tree is specified on value prop on provider comp. then any comp will be able to access it
		// we can wrap any part of our components to provide it with value of the context.
		// so children passed will be the App component if we want global context
		// <ThemeContext.Provider value={{ color: 'blue' }}>
		// 	{children}
		// </ThemeContext.Provider>

    //any comp which consumes this context will re render when this value obj changes
    <ThemeContext.Provider value={{ ...state, changeColor }}>
			{children}
		</ThemeContext.Provider>
	);
}
