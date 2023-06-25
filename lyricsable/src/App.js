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
      const response = await axios.get('https://api.genius.com/search', {
        headers: {
          Authorization: 'MNOy0GRwwonuahUAdj1GmHTs4tsps6I4tRUReI_fGBF27P9BcxUEj0V-Xh6ENF-M', // Replace with your actual access token
        },
        params: {
          q: lyricPhrase,
        },
      });

      const hits = response.data.response.hits;
      const songResults = hits.map((hit) => ({
        title: hit.result.title,
        artist: hit.result.primary_artist.name,
      }));

      setSongs(songResults);
    } catch (error) {
      console.error('Error searching for songs:', error);
    }
  };

  return (
    <div>
      <h1>Genius API Song Search</h1>
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
