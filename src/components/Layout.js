import React from 'react';
import { Link } from 'react-router-dom';
import WebApp from '@twa-dev/sdk';

function Layout({ children }) {
  const homeLink = WebApp.initDataUnsafe?.start_param ? (
    <a href="https://t.me/yt_opener_bot/open" target="_blank" rel="noopener noreferrer">Главная</a>
  ) : (
    <Link to="/">Главная</Link>
  );

  return (
    <div className="app-container">
      <header>
        <nav>
          {homeLink}
        </nav>
      </header>
      <main>{children}</main>
      <footer>
      Создано через AI сообществом&nbsp;
        <a href="https://itbeard.com/evocoders" target="_blank" rel="noopener noreferrer">
          "Эволюция Кода"
        </a>
      </footer>
    </div>
  );
}

export default Layout;