import { useState, useEffect } from 'react';
import './App.css';

import SingleCard from './components/SingleCard';

const cardImages = [
	{ src: '/img/helmet-1.png', matched: false },
	{ src: '/img/potion-1.png', matched: false },
	{ src: '/img/ring-1.png', matched: false },
	{ src: '/img/scroll-1.png', matched: false },
	{ src: '/img/shield-1.png', matched: false },
	{ src: '/img/sword-1.png', matched: false },
];

function App() {
	const [cards, setCards] = useState([]);
	const [turns, setTurns] = useState(0);
	const [choiceOne, setChoiceOne] = useState(null);
	const [choiceTwo, setChoiceTwo] = useState(null);
	const [disabled, setDisabled] = useState(false);

	// shuffle cards for new game
	const shuffleCards = () => {
		//need 2 of each card
		const shuffledCards = [...cardImages, ...cardImages]
			//for each pair compared, if we return less than 0, order stays same, if we return greater than 0, order is swapped
			//to get a random order, math.random gives number b/m 1 and 0, and we subtract 0.5
			.sort(() => Math.random() - 0.5)
			//giving a random id to each card
			.map((card) => ({ ...card, id: Math.random() }));

		setChoiceOne(null);
		setChoiceTwo(null);
		setCards(shuffledCards);
		setTurns(0);
	};

	//handle a choice
	const handleChoice = (card) => {
		choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
		//cant compare choices here, as above line is async
	};

	const resetTurn = () => {
		setChoiceOne(null);
		setChoiceTwo(null);
		setTurns((prevTurns) => prevTurns + 1);
		setDisabled(false);
	};

	//comparing choices
	useEffect(() => {
		// shouldnt set disabled as true here, as useEffect runs on 1st evaluation of comp
		// setDisabled(true);

		if (choiceOne && choiceTwo) {
			setDisabled(true);
			if (choiceOne.src === choiceTwo.src) {
				console.log('Choices are equal');
				setCards((prevCards) => {
					return prevCards.map((card) => {
						if (card.src === choiceOne.src) {
							return { ...card, matched: true };
						} else {
							return card;
						}
					});
				});
				resetTurn();
			} else {
				//dont reset turn immediately, wait for sometime
				console.log('Choices are not equal');
				setTimeout(() => resetTurn(), 1000);
			}
		}
	}, [choiceOne, choiceTwo]);

	// start a new game automatically
	useEffect(() => {
		shuffleCards();
	}, []);

	return (
		<div className="App">
			<h1>Magic Match</h1>
			<button onClick={shuffleCards}>New Game</button>

			<div className="card-grid">
				{cards.map((card) => (
					// shud put key prop here and not inside the comp, it wont mean anything inside the comp
					<SingleCard
						key={card.id}
						card={card}
						handleChoice={handleChoice}
						// card shud stay flipped in these 3 cases
						//on 2nd choice, if it is wrong choice, for that card matched is false but choiceTwo is card, so it also shows flipped
						flipped={
							card === choiceOne ||
							card === choiceTwo ||
							card.matched
						}
						disabled={disabled}
					/>
				))}
			</div>
			<p>Turns: {turns}</p>
		</div>
	);
}

export default App;
