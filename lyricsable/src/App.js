import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [lyricPhrase, setLyricPhrase] = useState('');
  const [songs, setSongs] = useState([]);

  const handleInputChange = (e) => {
    setLyricPhrase(e.target.value);
  };

  const searchSongs = async () => {
    try {
      const response = await axios.get('src/search', {
        headers: {
          Authorization: 'oRsXMgO-UKGC0bPczbW5XJDQDpOn9478VbULsCJprhm4dkOQpQN5Xuwk3ylwwKzq', // Replace with your actual access token
        },
        params: {
          q: lyricPhrase,
        },
      });

      if (response.data && response.data.response) {
        const songResults = response.data.response.map((song) => ({
          title: song.title,
          artist: song.artist,
        }));
        setSongs(songResults);
      } else {
        console.log('Invalid response data:', response.data);
      }
    } catch (error) {
      console.error('Error searching for songs:', error);
    }
  };

  return (
    <div>
      <h1>Song Search</h1>
      <input type="text" value={lyricPhrase} onChange={handleInputChange} />
      <button onClick={searchSongs}>Search</button>

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
