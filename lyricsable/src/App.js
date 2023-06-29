import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [lyricPhrase, setLyricPhrase] = useState('');
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setLyricPhrase(e.target.value);
  };

  const searchSongs = async () => {
    try {
      const response = await axios.get('/api/search', {
        headers: {
          Authorization: '9x5tnUTxs07G7EBwoL_GlQHBKZmkY86Tq0j-HoBjetbsdrR_7-5h8H3vPoxMancy', // Replace with your actual access token
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
        setError('');
      } else {
        setSongs([]);
        setError('No songs found');
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

      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {songs.map((song, index) => (
            <li key={index}>
              <strong>{song.title}</strong> by {song.artist}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
