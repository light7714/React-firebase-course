import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//importing the context we defined in ThemeContext
import { ThemeProvider } from './context/ThemeContext';

ReactDOM.render(
  <React.StrictMode>
  {/* we can wrap any part of our components to provide it with value of the context. here as we're wrapping the root comp, it gives a global context value */}
  {/* the value passed into comp tree is specified on value prop on provider comp. then any comp will be able to access it */}
    {/* <ThemeContext.Provider value={{ color: 'blue' }} >
      <App />
    </ThemeContext.Provider> */}
    {/* There is another method than the above way, written in ThemeContext */}
    {/* Own comp themeProvider */}
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
