const axios = require('axios');

export default async function handler(req, res) {
  try {
    const { q } = req.query;
    const response = await axios.get('https://api.genius.com/search', {
      headers: {
        Authorization: '9x5tnUTxs07G7EBwoL_GlQHBKZmkY86Tq0j-HoBjetbsdrR_7-5h8H3vPoxMancy', // Replace with your actual access token
      },
      params: {
        q,
      },
    });
    
    const hits = response.data.response.hits;
    if (hits && hits.length > 0) {
      const songResults = hits.map((hit) => ({
        title: hit.result.title,
        artist: hit.result.primary_artist.name,
      }));
      res.status(200).json(songResults);
    } else {
      res.status(204).json({ error: 'No songs found' });
    }
  } catch (error) {
    console.error('Error searching for songs:', error);
    res.status(500).json({ error: 'An error occurred while searching for songs' });
  }
}