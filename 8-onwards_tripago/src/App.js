import { useState } from 'react';

import './App.css';
import TripList from './components/TripList';

function App() {
  const [showTrips, setShowTrips] = useState(true);

  return (
    <div className="App">
      {/* if we click this btn while fetch is still going on in useFetch hook, it'll unmount this TripList component, but fetch still works in the background, and react will try to change state of a unmounted component, which isnt possible so it'll show a warning (can try by devtools->network->throttling->3g) */}
      <button onClick={() => setShowTrips(false)}>hide trips</button>
      {showTrips ? <TripList /> : null}
    </div>
  );
}

export default App;
