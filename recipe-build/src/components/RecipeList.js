import { Link } from 'react-router-dom';

import './RecipeList.css';

//recipes cant be null, but can be empty
export default function RecipeList({ recipes }) {
	if (recipes.length === 0) {
		return <div className="error">No recipes to load!</div>;
	}

	return (
		<div className="recipe-list">
			{recipes.map((recipe) => (
				<div key={recipe.id} className="card">
					<h3>{recipe.title}</h3>
					<p>{recipe.cookingTime} to make</p>
					{/* outputting only a part of the whole method */}
					<div>{recipe.method.substring(0, 100)}...</div>
					<Link to={`/recipes/${recipe.id}`}>Cook This</Link>
				</div>
			))}
		</div>
	);
}