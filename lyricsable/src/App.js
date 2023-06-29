import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [lyricPhrase, setLyricPhrase] = useState('');
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setLyricPhrase(e.target.value);
  };

  const searchSongs = async () => {
    try {
      setError(null); // Clear any previous errors
      const response = await axios.get('/api/search', {
        headers: {
          Authorization: 'oRsXMgO-UKGC0bPczbW5XJDQDpOn9478VbULsCJprhm4dkOQpQN5Xuwk3ylwwKzq', // Replace with your actual access token
        },
        params: {
          q: lyricPhrase,
        },
      });

      if (response.data && response.data.length > 0) {
        const songResults = response.data.map((song) => ({
          title: song.title,
          artist: song.artist,
        }));
        setSongs(songResults);
      } else {
        console.log('No songs found');
        setSongs([]); // Clear the songs state
      }
    } catch (error) {
      console.error('Error searching for songs:', error);
      setError('An error occurred while searching for songs');
    }
  };

  return (
    <div>
      <h1>Song Search</h1>
      <input type="text" value={lyricPhrase} onChange={handleInputChange} />
      <button onClick={searchSongs}>Search</button>

      {error && <p>{error}</p>}

      <ul>
        {songs.map((song, index) => (
          <li key={index}>
            <strong>{song.title}</strong> by {song.artist}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
