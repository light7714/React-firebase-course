import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

//pages & comps
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Navbar from './components/Navbar';

function App() {
	//will be false at starting (even at a refresh), then true once we check with firebase if user is logged in or not (in AuthContext)
	const { authIsReady } = useAuthContext();

	return (
		<div className="App">
			{authIsReady ? (
				<BrowserRouter>
					<Navbar />
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route path="/login">
							<Login />
						</Route>
						<Route path="/signup">
							<Signup />
						</Route>
					</Switch>
				</BrowserRouter>
			) : null}
		</div>
	);
}

export default App;
