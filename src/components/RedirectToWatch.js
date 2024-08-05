import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function RedirectToWatch() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const videoId = searchParams.get('v') || searchParams.get('start_param');
    
    if (videoId) {
      navigate(`/watch?v=${videoId}`);
    } else {
      navigate('/');
    }
  }, [navigate, location]);

  return null; // This component doesn't render anything
}

export default RedirectToWatch;