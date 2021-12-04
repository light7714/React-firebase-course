import { Link } from 'react-router-dom';
// import { useContext } from 'react';
// import { ThemeContext } from '../context/ThemeContext';
import { useTheme } from '../hooks/useTheme';

import './Navbar.css';

import Searchbar from './Searchbar';

export default function Navbar() {
	// we pass whatever context obj we wanna access inside useContext(). here we wanna access ThemeContext
	// returns the value prop we passed to Context Provider (ThemeProvider here)
	// const { color } = useContext(ThemeContext);
	// Another way of using context is making custom hook useTheme (to put custom logic)
	const { color } = useTheme();

	return (
		<div className="navbar" style={{ background: color }}>
			<nav>
				<Link to="/" className="brand">
					<h1>Cooker</h1>
				</Link>
				<Searchbar />
				<Link to="/create">Create Recipe</Link>
			</nav>
		</div>
	);
}
