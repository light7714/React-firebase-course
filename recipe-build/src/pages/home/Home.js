import RecipeList from '../../components/RecipeList';

import { useFetch } from '../../hooks/useFetch';

import './Home.css';

export default function Home() {
	const { data, isPending, error } = useFetch(
		'http://localhost:3000/recipes'
	);

	return (
		<div className="home">
			{error ? <p className="error">{error}</p> : null}
			{isPending ? <p className="loading">Loading...</p> : null}
			{data
				? <RecipeList recipes={data} />
				: null}
		</div>
	);
}
