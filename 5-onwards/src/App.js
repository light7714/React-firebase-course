// import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Title from './components/Title';
import Modal from './components/Modal';
import EventList from './components/EventList';

//the root component
//we nest multiple comps inside the app comp, it forms a comp tree
function App() {
	//can only use hooks on top level of a component (cant use in handleClick() for eg), except for custom hooks
	//can use hooks inside the scope of component (like not globally)

	const [showModal, setShowModal] = useState(false);
	const [showEvents, setShowEvents] = useState(true);
	const [events, setEvents] = useState([
		{ title: "mario's birthday bash", id: 1 },
		{ title: "bowser's live stream", id: 2 },
		{ title: 'race on moo moo farm', id: 3 },
	]);

	const handleClick = (id) => {
		setEvents((prevEvents) => {
			return prevEvents.filter((event) => {
				return id !== event.id;
			});
		});
		console.log(id);
	};

	const handleClose = () => {
		setShowModal(false);
	};

	const subtitle = 'Latest events in Champuland';
	return (
		<div className="App">
			{/* can use comp template like this */}
			{/* to put a prop into a component, just make smthin like an attribute on the comp */}
			<Title title="Events in your Area" subtitle={subtitle} />

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

			{/* {showEvents &&
				events.map((event, index) => (
					//React wants us to place a unique key prop on the parent element on each of the template (list ele we are returning) to track it
					//as there is a prop, cant just use empty tag for fragment
					<React.Fragment key={event.id}>
						<h2>
							{index + 1}.{event.title}
						</h2>
						<button onClick={() => handleClick(event.id)}>
							Delete
						</button>
					</React.Fragment>
				))} */}

			{showEvents && (
				<EventList events={events} handleClick={handleClick} />
			)}

			{/* passing a fn as a prop to modal, so when close btn is clicked there, it can change showModal's state here */}
			{/* The modal comp is now made into a portal (see Modal.js) with location as document.body, so it will show at end of body tag in the DOM instead of inside the root div tag. But the styles will change, as some were defined in App.css */}
			{showModal ? (
				<Modal handleClose={handleClose} isSalesModal={true}>
					{/* this template below is the child of Modal, so called children props */}
					<h2>10% Off Coupon Code!!</h2>
					<p>Use the code NINJA10 at the checkout.</p>
				</Modal>
			) : null}

			<div>
				<button onClick={() => setShowModal(true)}>Show modal</button>
			</div>
		</div>
	);
}

export default App;
