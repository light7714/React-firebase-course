import { useLocation } from "react-router-dom";

export default function Contact() {
  // to get any query params (/contact?name=chomu) from the url
  //useLocation gets us info abt the current location we're on in the browser, search gets us the whole query string
  const queryString = useLocation().search;
  // console.log(queryString); //we'll get whole string (?name=chomu)

  // js class URLSearchParams
  const queryParams = new URLSearchParams(queryString);
  // to get a specific parameter
  const name = queryParams.get("name");

	return (
		<div>
			<h2>Hey {name ? name : "there"}, Contact us here</h2>
			<p>
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
				explicabo dolor eum inventore earum, maxime neque quasi illum,
				nobis reiciendis facere culpa. Dignissimos necessitatibus, atque
				saepe totam ratione nulla asperiores!
			</p>
		</div>
	);
}
