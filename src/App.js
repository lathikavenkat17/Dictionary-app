import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (word.trim() === '') {
      setError('Please enter a word');
      setDefinition(null);
      return;
    }

    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      setDefinition(response.data[0]);
      setError('');
    } catch (err) {
      setError('Word not found');
      setDefinition(null);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Dictionary App</h1>
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Enter a word"
        />
        <button onClick={handleSearch}>Search</button>
        {error && <p className="error">{error}</p>}
        {definition && (
          <div className="definition">
            <h2>{definition.word}</h2>
            {definition.phonetics.map((phonetic, index) => (
              <div key={index}>
                {phonetic.text && <p>{phonetic.text}</p>}
                {phonetic.audio && (
                  <audio controls>
                    <source src={phonetic.audio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                )}
              </div>
            ))}
            {definition.meanings.map((meaning, index) => (
              <div key={index}>
                <h3>{meaning.partOfSpeech}</h3>
                <ul>
                  {meaning.definitions.map((def, idx) => (
                    <li key={idx}>{def.definition}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;

