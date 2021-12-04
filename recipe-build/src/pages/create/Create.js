import { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// import { useFetch } from '../../hooks/useFetch';
import { projectFirestore } from '../../firebase/config';

import './Create.css';

export default function Create() {
	const [title, setTitle] = useState('');
	const [method, setMethod] = useState('');
	const [cookingTime, setCookingTime] = useState('');
	const [newIngredient, setNewIngredient] = useState('');
	const [ingredients, setIngredients] = useState([]);

	const history = useHistory();

	// const { postData, data, error } = useFetch(
	// 	'http://localhost:3000/recipes',
	// 	'POST'
	// );

	//we wanna focus input when entering new ingredients, so making a ref to the ingredients input
	const ingredientInput = useRef(null);

	const handleSubmit = async (e) => {
		e.preventDefault();

		// // json server automatically adds a unique id when it saves new data
		// postData({
		// 	title,
		// 	ingredients,
		// 	method,
		// 	cookingTime: cookingTime + 'minutes',
		// });

		const doc = {
			title,
			ingredients,
			method,
			cookingTime: cookingTime + 'minutes',
		};

		//automatically adds a unique id
		try {
			await projectFirestore.collection('recipes').add(doc);
			// now redirect can be done here, as we're using await
			history.push('/');
		} catch (err) {
			console.log('error in handleSubmit() in Create.js:', err);
		}
	};

	// //redirect the user when we get data response (not done in handleSubmit as postData is async)
	// useEffect(() => {
	// 	if (data) {
	// 		history.push('/');
	// 	}
	// }, [data, history]);

	const handleAdd = (e) => {
		e.preventDefault();
		const ing = newIngredient.trim(); //remove whitespaces

		//ingredients must be unique (as we're using it as key prop)
		if (ing && !ingredients.includes(ing)) {
			setIngredients((prevIngredients) => [...prevIngredients, ing]);
		}
		setNewIngredient('');

		//we wanna focus input when entering new ingredients, so making a ref to the ingredients input
		ingredientInput.current.focus();
	};

	return (
		<div className="create">
			<h2 className="page-title">Add a new recipe</h2>
			<form onSubmit={handleSubmit}>
				<label>
					<span>Recipe title:</span>
					<input
						type="text"
						onChange={(e) => setTitle(e.target.value)}
						value={title}
						required
					/>
				</label>

				<label>
					<span>Recipe ingredients:</span>
					<div className="ingredients">
						<input
							type="text"
							onChange={(e) => setNewIngredient(e.target.value)}
							value={newIngredient}
							ref={ingredientInput}
						/>
						<button onClick={handleAdd} className="btn">
							Add
						</button>
					</div>
				</label>
				<p>
					Current Ingredients:{' '}
					{ingredients.map((i) => (
						<em key={i}>{i}, </em>
					))}
				</p>

				<label>
					<span>Recipe method:</span>
					<textarea
						onChange={(e) => setMethod(e.target.value)}
						value={method}
						required
					/>
				</label>
				<label>
					<span>Cooking time in minutes:</span>
					<input
						type="number"
						onChange={(e) => setCookingTime(e.target.value)}
						value={cookingTime}
					/>
				</label>

				<button className="btn">Submit</button>
			</form>
		</div>
	);
}
