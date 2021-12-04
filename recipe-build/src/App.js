import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import ThemeSelector from './components/ThemeSelector';
import Home from './pages/home/Home';
import Create from './pages/create/Create';
import Search from './pages/search/Search';
import Recipe from './pages/recipe/Recipe';
import { useTheme } from './hooks/useTheme';

import './App.css';

function App() {
	const { mode } = useTheme();

	return (
    // 2 classes applied. when mode=light, then light class is also applied, and we dont need to do anything there
		<div className={`App ${mode}`}>
			<BrowserRouter>
				<Navbar />
				<ThemeSelector />

				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route path="/create">
						<Create />
					</Route>
					<Route path="/search">
						<Search />
					</Route>
					<Route path="/recipes/:id">
						<Recipe />
					</Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
