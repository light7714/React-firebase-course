import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { projectFirestore } from '../firebase/config';

import './RecipeList.css';
import Trashcan from '../assets/trashcan.svg';

//recipes cant be null, but can be empty
export default function RecipeList({ recipes }) {
	const { mode } = useTheme();

	if (recipes.length === 0) {
		return <div className="error">No recipes to load!</div>;
	}

	const handleClick = (id) => {
		// this will delete the doc, and not showing the doc is upto home comp
		projectFirestore.collection('recipes').doc(id).delete();
	};

	return (
		<div className="recipe-list">
			{recipes.map((recipe) => (
				<div key={recipe.id} className={`card ${mode}`}>
					<h3>{recipe.title}</h3>
					<p>{recipe.cookingTime} to make</p>
					{/* outputting only a part of the whole method */}
					<div>{recipe.method.substring(0, 100)}...</div>
					<Link to={`/recipes/${recipe.id}`}>Cook This</Link>
					<img
						src={Trashcan}
						alt="Delete recipe"
						className="delete"
						onClick={() => handleClick(recipe.id)}
					/>
				</div>
			))}
		</div>
	);
}
