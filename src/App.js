import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import WebApp from '@twa-dev/sdk';
import VideoPlayer from './VideoPlayer';
import './App.css';

function Home() {
  const [videoUrl, setVideoUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const videoId = extractVideoId(videoUrl);
    if (videoId) {
      navigate(`/watch?v=${videoId}`);
    } else {
      alert('Неверная ссылка на YouTube видео');
    }
  };

  const extractVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <div>
      <h1>YouTube Video Opener</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="Вставьте ссылку на YouTube видео"
        />
        <button type="submit">Открыть видео</button>
      </form>
    </div>
  );
}

function Watch() {
  const videoId = new URLSearchParams(window.location.search).get('v');

  useEffect(() => {
    WebApp.ready();
    WebApp.expand();
  }, []);

  return (
    <div>
      <h1>YouTube Video Player</h1>
      {videoId ? (
        <VideoPlayer videoId={videoId} />
      ) : (
        <p>Видео не найдено. Пожалуйста, вернитесь на главную страницу и попробуйте снова.</p>
      )}
    </div>
  );
}

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    WebApp.ready();
    
    // Определяем тему Telegram
    const isDark = WebApp.colorScheme === 'dark';
    setIsDarkTheme(isDark);

    // Добавляем слушатель для изменения темы
    WebApp.onEvent('themeChanged', () => {
      setIsDarkTheme(WebApp.colorScheme === 'dark');
    });
  }, []);

  return (
    <Router>
      <div className={`App ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watch" element={<Watch />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;