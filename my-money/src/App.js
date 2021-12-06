import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

//pages & comps
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Navbar from './components/Navbar';

function App() {
	//will be false at starting (even at a refresh), then true once we check with firebase if user is logged in or not (in AuthContext)
	const { authIsReady, user } = useAuthContext();

	return (
		<div className="App">
			{authIsReady ? (
				<BrowserRouter>
					<Navbar />
					<Switch>
						<Route exact path="/">
							{/* logged out user should be redirected */}
							{user ? <Home /> : <Redirect to="/login" />}
						</Route>
						<Route path="/login">
							{/* only go here when user is not logged in, else redirect */}
							{!user ? <Login /> : <Redirect to="/" />}
						</Route>
						<Route path="/signup">
							{/* only go here when user is not logged in, else redirect */}
							{!user ? <Signup /> : <Redirect to="/" />}
						</Route>
					</Switch>
				</BrowserRouter>
			) : null}
		</div>
	);
}

export default App;
