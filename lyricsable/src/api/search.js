const axios = require('axios');

export default async function handler(req, res) {
  try {
    const { q } = req.query;
    const response = await axios.get('https://api.genius.com/search/?', {
      headers: {
        Authorization: 'oRsXMgO-UKGC0bPczbW5XJDQDpOn9478VbULsCJprhm4dkOQpQN5Xuwk3ylwwKzq', // Replace with your actual access token
      },
      params: {
        q,
      },
    });
    
    const hits = response.data.response.hits;
    const songResults = hits.map((hit) => ({
      title: hit.result.title,
      artist: hit.result.primary_artist.name,
    }));

    res.status(200).json(songResults);
  } catch (error) {
    console.error('Error searching for songs:', error);
    res.status(500).json({ error: 'An error occurred while searching for songs' });
  }
}