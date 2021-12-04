//this hook will be used in component where we wanna access the global context value
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export const useTheme = () => {
	// we pass whatever context obj we wanna access inside useContext(). here we wanna access ThemeContext
	// returns the value prop we passed to Context Provider (ThemeProvider)
	const context = useContext(ThemeContext);

	//context = undefined if we try to use it outside its scope, tho in this case it wraps the whole application
	if (context === undefined) {
		throw new Error('useTheme() must be used inside a ThemeProvider');
	}

	return context;
};
