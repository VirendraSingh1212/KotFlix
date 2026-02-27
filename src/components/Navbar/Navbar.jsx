import { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__left">
        <h1 className="navbar__logo">KOTFLIX</h1>
        <ul className="navbar__links">
          <li><a href="#" className="active">Home</a></li>
          <li><a href="#">TV Shows</a></li>
          <li><a href="#">Movies</a></li>
          <li><a href="#">New & Popular</a></li>
          <li><a href="#">My List</a></li>
        </ul>
      </div>
      <div className="navbar__right">
        <span className="navbar__icon">🔍</span>
        <span className="navbar__icon">🔔</span>
        <div className="navbar__avatar">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="Profile" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
