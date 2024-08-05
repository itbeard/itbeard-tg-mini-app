import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import WebApp from '@twa-dev/sdk';
import VideoPlayer from './VideoPlayer';

function Watch() {
  const location = useLocation();
  const videoId = new URLSearchParams(location.search).get('v');

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

export default Watch;