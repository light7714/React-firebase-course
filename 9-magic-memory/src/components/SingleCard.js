import './SingleCard.css';

export default function SingleCard({ card, handleChoice, flipped, disabled }) {
	const handleClick = () => {
		if (!disabled) {
			handleChoice(card);
		}
	};

	return (
		//cant put key property here, as for html it doesnt mean anything.. put in where u use the comp
		<div className="card">
			<div className={flipped ? 'flipped' : ''}>
				<img className="front" src={card.src} alt="card front" />
				<img
					className="back"
					src="/img/cover.png"
					onClick={handleClick}
					alt="cover"
				/>
			</div>
		</div>
	);
}
