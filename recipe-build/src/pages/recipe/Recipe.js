import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import { useFetch } from '../../hooks/useFetch';
import { useTheme } from '../../hooks/useTheme';
import { projectFirestore } from '../../firebase/config';

import './Recipe.css';

export default function Recipe() {
	const { mode } = useTheme();
	const { id } = useParams();

	// const url = 'http://localhost:3000/recipes/' + id;
	// const { data: recipe, isPending, error } = useFetch(url);

	const [recipe, setRecipe] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		setIsPending(true);

		// 	//fetching single document
		// 	projectFirestore
		// 		.collection('recipes')
		// 		// we got a reference to a single doc
		// 		.doc(id)
		// 		.get()
		// 		.then((doc) => {
		// 			if (doc.exists) {
		// 				// we dont need id here
		// 				setRecipe(doc.data());
		// 				setIsPending(false);
		// 			} else {
		// 				setError('Could not find the recipe!');
		// 				setIsPending(false);
		// 			}
		// 		})
		// 		.catch((err) => {});
		// }, [id]);

		//using onSnapshot so that if something is updated, we see it on UI (see more details for onSnapshot in home comp)
		const unsub = projectFirestore
			.collection('recipes')
			.doc(id)
			.onSnapshot((doc) => {
				if (doc.exists) {
					// we dont need id here
					setRecipe(doc.data());
					setIsPending(false);
				} else {
					setError('Could not find the recipe!');
					setIsPending(false);
				}
			});

		return () => {
			unsub();
		};
	}, [id]);

	const handleClick = () => {
		// only pass properties u wanna update
		projectFirestore.collection('recipes').doc(id).update({
			title: 'Whats in a name?',
		});
	};

	return (
		<div className={`recipe ${mode}`}>
			{error ? <p className="error">{error}</p> : null}
			{isPending ? <p className="loading">Loading...</p> : null}
			{recipe ? (
				<>
					<h2 className="page-title">{recipe.title}</h2>
					<p>Takes {recipe.cookingTime} to cook.</p>
					<ul>
						{/* will make sure later that ingredients are unique */}
						{recipe.ingredients.map((ing) => (
							<li key={ing}>{ing}</li>
						))}
					</ul>
					<p className="method">{recipe.method}</p>
					<button onClick={handleClick}>Update Me</button>
				</>
			) : null}
		</div>
	);
}
