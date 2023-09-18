import React from 'react';
import './App.css';
import Converter from './Converter';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Code Genius</h1>
        <Converter />
        <button className="button-85" id="github" role='button'>Push Code to GitHub</button>
      </header>
    </div>
  );
}

export default App;
