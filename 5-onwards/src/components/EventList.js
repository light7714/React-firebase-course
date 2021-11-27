// import React from "react";
//way to import css modules
import styles from './EventList.module.css';

export default function EventList({ events, handleClick }) {
	// return (
	// 	<>
	// 		{events.map((event, index) => (
	// 			<React.Fragment key={event.id}>
	// 				<h2>
	// 					{index + 1}.{event.title}
	// 				</h2>
	// 				<button onClick={() => handleClick(event.id)}>
	// 					Delete
	// 				</button>
	// 			</React.Fragment>
	// 		))}
	// 	</>
	// );
	return (
		<>
			{events.map((event, index) => (
				// card class defined in its css module (EventList.module.css)
				//this card class will change to EventList_card_(randomLetters) in DOM
				//so only here class name will be the new one, if there is class="card" somewhere else too, it wont be affected
				<div className={styles.card} key={event.id}>
					<h2>
						{index + 1}.{event.title}
					</h2>
					<button onClick={() => handleClick(event.id)}>
						Delete
					</button>
				</div>
			))}
		</>
	);
}
