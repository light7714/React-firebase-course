//here we need to extract the route param (id) and find correct data for that id
import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';

export default function Article() {
	// params will contain any route params from the url on this page
	//we have params.id as our route param was named id
	// const params = useParams();
	const { id } = useParams();
	//json server will fetch the correct article
	const url = 'http://localhost:3000/articles/' + id;
	const { data: article, isPending, error } = useFetch(url);
	//can use history to redirect the user
	const history = useHistory();

	//on error, we wanna redirect to home page after some time
	useEffect(() => {
		if (error) {
			// history.goBack();
			//allows us to push (redirect) user to another route
			setTimeout(() => {
				history.push('/');
			}, 2000);
		}
	}, [error, history]);

	return (
		<div>
			{isPending ? <div>Loading...</div> : null}
			{error ? <div>{error}</div> : null}
			{article ? (
				<div>
					<h2>{article.title}</h2>
					<p>By {article.author}</p>
					<p>{article.body}</p>
				</div>
			) : null}
		</div>
	);
}
