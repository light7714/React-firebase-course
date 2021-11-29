import './App.css';
import {
	BrowserRouter,
	Route,
	Switch,
	NavLink,
	Redirect,
} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Article from './pages/Article';

function App() {
	return (
		<div className="App">
			{/* browserrouter surrounds everything that might have a route */}
			<BrowserRouter>
				<nav>
					<h1>My Articles</h1>
					{/* rn we're sending new req to server for each page when link is clicked and getting the html page with the req content (can see network tab in devtool), but this is not react way, we want react router to intercept those requests and dynamically change the comp on page */}
					{/* <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a> */}

					{/* in this way, we can see no new html page recvd in network tab when link is clicked */}
					{/* Can also use <Link> tag, NavLink also applies an active class to an anchor tag when that is the link we're on so we can style it differently, Link doesnt do that*/}
					{/* But when we go to /about, / will also have active class if we dont use exact prop */}
					<NavLink exact to="/">
						Home
					</NavLink>
					<NavLink to="/about">About</NavLink>
					<NavLink to="/contact">Contact</NavLink>
				</nav>

				{/* react router matches the path in url with path here we set up, if path in url is /about, it'll match both / and /about as / exists in /about. */}
				{/* to not match more than 1 comp, we wrap it all in Switch. if exact not added as prop, for url /about, it'll only show home comp as it sees from top to bottom. after adding exact on home, home will be shown only on exact match*/}
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route path="/about">
						<About />
					</Route>
					<Route path="/contact">
						<Contact />
					</Route>

					{/* route parameter */}
					<Route path="/articles/:id">
						<Article />
					</Route>

					{/* catch-all route */}
					<Route path="*">
						{/* redirect component */}
						<Redirect to="/" />
					</Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
