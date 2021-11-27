import logo from './logo.svg';
//when we import css file this way in app.js, a style tag, with all defined styles is injected in the index.html page (see dev tools)
import './App.css';
//for older versions of React (<17)
// import React from 'react';  < vc 

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React & Firebase
        </a>
      </header>
    </div>
  );
}

export default App;
