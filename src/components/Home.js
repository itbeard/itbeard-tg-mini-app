import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { extractVideoId } from '../utils/videoUtils';
import WebApp from '@twa-dev/sdk';

function Home() {
  const [videoUrl, setVideoUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const videoId = extractVideoId(videoUrl);
    if (videoId) {
      navigate(`/watch?v=${videoId}`);
    } else {
        WebApp.showAlert('Неверная ссылка!');
    }
  };

  return (
    <div className="content-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="Вставьте ссылку на YouTube видео"
        />
        <button type="submit">Смотреть!</button>
      </form>
    </div>
  );
}

export default Home;