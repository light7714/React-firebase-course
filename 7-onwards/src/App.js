// import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Title from './components/Title';
import Modal from './components/Modal';
import EventList from './components/EventList';
import NewEventForm from './components/NewEventForm';

function App() {
	const [showModal, setShowModal] = useState(false);
	const [showEvents, setShowEvents] = useState(true);
	const [events, setEvents] = useState([]);

	const addEvent = (event) => {
		setEvents((prevEvents) => {
			return [...prevEvents, event];
		});
		setShowModal(false);
	};

	const handleClick = (id) => {
		setEvents((prevEvents) => {
			return prevEvents.filter((event) => {
				return id !== event.id;
			});
		});
		console.log(id);
	};

	const subtitle = 'Latest events in Champuland';
	return (
		<div className="App">
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

			{showEvents && (
				<EventList events={events} handleClick={handleClick} />
			)}

			{/* The modal comp is now made into a portal (see Modal.js) with location as document.body, so it will show at end of body tag in the DOM instead of inside the root div tag. But the styles will change, as some were defined in App.css */}
			{showModal ? (
				<Modal isSalesModal={true}>
					<NewEventForm addEvent={addEvent} />
				</Modal>
			) : null}

			<div>
				<button onClick={() => setShowModal(true)}>
					Add New Event
				</button>
			</div>
		</div>
	);
}

export default App;
