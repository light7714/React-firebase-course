// import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
// import Title from './components/Title';

//the root component
//we nest multiple comps inside the app comp, it forms a comp tree
function App() {
	//can only use hooks on top level of a component (cant use in handleClick() for eg), except for custom hooks
	//can use hooks inside the scopt of component (like not globally)

	// let name = 'Mario';
	//array destructuring used to grab 2 values returned by useState (use any names), name var is same as 'mario', setName is fn we'll use to change the name state
	// const [name, setName] = useState('mario');
	const [showEvents, setShowEvents] = useState(true);
	const [events, setEvents] = useState([
		{ title: "mario's birthday bash", id: 1 },
		{ title: "bowser's live stream", id: 2 },
		{ title: 'race on moo moo farm', id: 3 },
	]);
	// const handleClick = () => {
	// 	// name= 'CHomu';
	// 	//will change the name, and reevalute the component
	// 	//its an async fn, so 1st time name will be logged as mario, but on screen it'll change to luigi (after logging)
	// 	setName('luigi');
	// 	console.log(name);
	// };

	const handleClick = (id) => {
		//setting events array as a new, filtered events array (with the element with id dltd) (return true means keeping that item)
		//*here, we're directly changing the events arr, but this is an async function, events might change before this is fired, so its bad practice.
		// setEvents(events.filter((event) => {
		//   return id !== event.id;
		// }))
		//*instead, we can pass a function into setEvents, which returns a new state value. React passes the events array to the setEvents, so prevEvents will receive it, and this value is gauranteed to be up to date. FOR more details see links in README.
		setEvents((prevEvents) => {
			return prevEvents.filter((event) => {
				return id !== event.id;
			});
		});
		//as a rule of thumb, whenever ur state depends on the prev state, always use a callback fn to access the prev state
		console.log(id);
	};

	return (
		//after clicking the btn, the name wont change if we directly just change name variable in handleClick(), as the dom has already rendered, even if the variable's value has changed. We need to tell react to revaulate the app component to see its changed state
		<div className="App">
			{/* tho shouldnt use && for conditional rendering: https://kentcdodds.com/blog/use-ternaries-rather-than-and-and-in-jsx */}
			{showEvents && (
				<div>
					<button onClick={() => setShowEvents(false)}>
						Hide Events
					</button>
				</div>
			)}
			{!showEvents && (
				<div>
					<button onClick={() => setShowEvents(true)}>
						Show Events
					</button>
				</div>
			)}
			{/* <h1>My name is {name}</h1> */}
			{/* <button onClick={handleClick}>Change name</button> */}
			{/*
        *each child in a list shud also have a unique key prop. its something we can use to keep track of template items in a list. React wants us to place a unique key prop on the parent element on each of the template (list ele we are returning)
        thats why we added an id with title
      */}
			{showEvents && events.map((event, index) => (
				<div key={event.id}>
					<h2>
						{index + 1}.{event.title}
					</h2>
					{/* cant do this, cuz it'll call the function instead of passing the id. Instead making an arrow fn, which has a return value of calling handleClick() */}
					{/* <button onClick={handleClick(event.id)}>Delete</button> */}
					<button onClick={() => handleClick(event.id)}>
						Delete
					</button>
				</div>
			))}
		</div>
	);
}

export default App;
