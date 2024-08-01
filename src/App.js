import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WebApp from '@twa-dev/sdk';

function App() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    WebApp.ready();
    fetchVideos();
  }, []);

  const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

  const fetchVideos = async () => {
    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          channelId: 'UCeObZv89Stb2xLtjLJ0De3Q',
          maxResults: 50,
          order: 'date',
          type: 'video',
          videoDuration: 'long',
          key: API_KEY
        }
      });
      const filteredVideos = response.data.items.filter(video => {
        return !video.kind.includes('youtube#searchListResponse');
      });
      setVideos(filteredVideos.slice(0, 10)); // Ограничим список 10 видео
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  return (
    <div className="App">
      <h1>Мои YouTube видео</h1>
      <ul>
        {videos.map((video) => (
          <li key={video.id.videoId}>
            <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
            <h3>{video.snippet.title}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;