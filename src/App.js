import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import WebApp from '@twa-dev/sdk';
import Home from './components/Home';
import Watch from './components/Watch';
import Layout from './components/Layout';
import './App.css';

function AppContent() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    WebApp.ready();
    WebApp.expand();
    
    // Определяем тему Telegram
    const isDark = WebApp.colorScheme === 'dark';
    setIsDarkTheme(isDark);

    // Добавляем слушатель для изменения темы
    WebApp.onEvent('themeChanged', () => {
      setIsDarkTheme(WebApp.colorScheme === 'dark');
    });

    // Проверяем наличие параметра 'v' в URL
    const searchParams = new URLSearchParams(location.search);
    const videoId = searchParams.get('v') || WebApp.initDataUnsafe?.start_param;
    if (videoId && location.pathname === '/') {
      navigate(`/watch?v=${videoId}`);
    }
  }, [navigate, location]);

  return (
    <div className={`App ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watch" element={<Watch />} />
        </Routes>
      </Layout>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;