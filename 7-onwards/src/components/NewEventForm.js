//This is the typical way of working with forms using controlled events, onChange and useState.
//But there is another way using refs (using useRef hook): way to get a reference to a raw dom element directly, like in vanilla js (queryselectors). we can get refs to each of our inputs, and using them we can get access to the input values
//But this refs method is less used, as its more in line with what react was designed for, using refs is reverting back to js way

import { useState } from 'react';
import './NewEventForm.css';

export default function NewEventForm({ addEvent }) {
	const [title, setTitle] = useState('');
	const [date, setDate] = useState('');
	const [location, setLocation] = useState('manchester');

	// //this fn fires for every letter typed
	// const handleChange = (e) => {
	// 	console.log(e.target, e.target.value);
	// 	setTitle(e.target.value);
	// };

	const resetForm = () => {
		setTitle('');
		setDate('');
		setLocation('manchester');
	};

	const handleSubmit = (e) => {
		//default submit behaviour is to submit data and refresh page, but we dont want refresh in our react SPA
		e.preventDefault();

		const event = {
			title: title,
			date: date,
			location: location,
			id: Math.floor(Math.random() * 10000),
		};
    console.log(event);
		addEvent(event);
		resetForm();
	};

	return (
		<form className="new-event-form" onSubmit={handleSubmit}>
			{/* htmlFor: JSX for HTML 'for'
            <label htmlFor="title">Event Title:</label>
            <input type="text" id="title" /> */}
			{/* OR */}
			<label>
				<span>Event Title:</span>
				{/* this is controlled input now, as we can control the value of the input from outside the input */}
				<input
					type="text"
					onChange={(e) => setTitle(e.target.value)}
					value={title}
				/>
			</label>
			<label>
				<span>Event Date:</span>
				<input
					type="date"
					onChange={(e) => setDate(e.target.value)}
					value={date}
				/>
			</label>
			<label>
				<span>Event location:</span>
				<select onChange={(e) => setLocation(e.target.value)}>
					<option value="manchester">Manchester</option>
					<option value="london">London</option>
					<option value="cardiff">Cardiff</option>
				</select>
			</label>
			{/* When we click a btn inside a form ele, the default action is to submit the form data and refresh the page */}
			<button>Submit</button>
			{/* <p>
				title: {title}, date: {date}
			</p>
			<p onClick={resetForm}>Reset</p> */}
		</form>
	);
}

// //Refs way

// import { useState, useRef } from 'react';
// import './NewEventForm.css';

// export default function NewEventForm({ addEvent }) {
//   //2 blank refs
//   const title = useRef();
//   const date = useRef();

// 	const resetForm = () => {
// 		title.current.value = "";
//     date.current.value = "";
// 	};

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
//     console.log(title, date);
//     //title.current gets the current element, which is input in this case
// 		const event = {
// 			title: title.current.value,
// 			date: date.current.value,
// 			id: Math.floor(Math.random() * 10000),
// 		};
//     addEvent(event);
//     resetForm();
// 	};

// 	return (
// 		<form className="new-event-form" onSubmit={handleSubmit}>
// 			<label>
// 				<span>Event Title:</span>
// 				<input
// 					type="text"
//           ref={title}
// 				/>
// 			</label>
// 			<label>
// 				<span>Event Date:</span>
// 				<input
// 					type="date"
//           ref={date}
// 				/>
// 			</label>

// 			<button>Submit</button>
// 		</form>
// 	);
// }
