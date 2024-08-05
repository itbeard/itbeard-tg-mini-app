import React from 'react';
import { Link } from 'react-router-dom';

function Layout({ children }) {
  return (
    <div className="app-container">
      <header>
        <nav>
          <Link to="/">Главная</Link>
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