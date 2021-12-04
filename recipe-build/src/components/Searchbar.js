import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './Searchbar.css';

export default function Searchbar() {
  const [term, setTerm] = useState('');
  const history = useHistory(); 

  const handleSubmit = (e) => {
    e.preventDefault();

    //redirecting to the page user searched for
    //?q=searchedTerm
    history.push(`/search?q=${term}`);
  }

  return (
    <div className="searchbar">
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Search:</label>
        {/* id for htmlFor */}
        <input type="text" id="search" onChange={(e) => setTerm(e.target.value)} required />
      </form>
    </div>
  )
}
