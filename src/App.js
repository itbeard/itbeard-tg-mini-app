import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import WebApp from '@twa-dev/sdk';
import VideoPlayer from './VideoPlayer'; // Мы создадим этот компонент
import './App.css';

function App() {
  const [videos, setVideos] = useState([]);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

  const fetchVideos = useCallback(async () => {
    if (!API_KEY) {
      console.error('YouTube API key is not set');
      return;
    }
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
        const title = video.snippet.title.toLowerCase();
        return !title.includes('#shorts') && 
               !title.includes('стрим') && 
               !title.includes('stream');
      });
      setVideos(filteredVideos.slice(0, 5)); // Ограничим список 10 видео
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  }, [API_KEY]);

  useEffect(() => {
    WebApp.ready();
    fetchVideos();
    
    // Определяем тему Telegram
    const isDark = WebApp.colorScheme === 'dark';
    setIsDarkTheme(isDark);

    // Добавляем слушатель для изменения темы
    WebApp.onEvent('themeChanged', () => {
      setIsDarkTheme(WebApp.colorScheme === 'dark');
    });
  }, [fetchVideos]);

  return (
    <div className={`App ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      <h1>Последние видео с канала АйТиБорода</h1>
      <ul>
        {videos.map((video) => (
          <li key={video.id.videoId}>
            <VideoPlayer videoId={video.id.videoId} />
            <h3>{video.snippet.title}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;