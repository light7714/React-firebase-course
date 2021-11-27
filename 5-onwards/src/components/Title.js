import './Title.css';
// export default function Title({ title, subtitle }) {
// 	//div has no purpose, except to wrap it in a single parent ele, so it bloats final html code
// 	//so we use react fragments, shorthand of using it is empty tags, but in actual react, its <React.fragment>
// 	return (
// 		<>
// 			<h1 className="title">{title}</h1>
// 			<br />
// 			<h2 className="subtitle">{subtitle}</h2>
// 		</>
// 	);
// }

export default function Title({ title, subtitle }) {
	return (
		<div className="title-block">
			<h1 className="title">{title}</h1>
			<br />
			<h2 className="subtitle">{subtitle}</h2>
		</div>
	);
}