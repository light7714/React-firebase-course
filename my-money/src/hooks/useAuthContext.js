import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuthContext = () => {
	//contains the state properties
	const context = useContext(AuthContext);

  //when used out of scope
	if (!context) {
		throw new Error('useAuthContext must be inside an AuthContextProvider');
	}

	return context;
};
