import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { extractVideoId } from '../utils/videoUtils';

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

export default Home;