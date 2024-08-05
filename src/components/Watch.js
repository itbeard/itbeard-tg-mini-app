import React from 'react';
import { useLocation } from 'react-router-dom';
import VideoPlayer from './VideoPlayer';

function Watch() {
  const location = useLocation();
  const videoId = new URLSearchParams(location.search).get('v');

  return (
    <div className="content-container">
      <h1>Ваше видео 😊</h1>
      {videoId ? (
        <VideoPlayer videoId={videoId} />
      ) : (
        <p>Видео не найдено. Пожалуйста, вернитесь на главную страницу и попробуйте снова.</p>
      )}
    </div>
  );
}

export default Watch;