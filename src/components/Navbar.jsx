import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const styles = {
    header: {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      padding: '20px',
      textAlign: 'center',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      position: 'relative',
      top: '0',
      zIndex: 1000,
    },
    headerTitle: {
      fontSize: '36px',
      color: '#6a1b9a',
      margin: '0',
    },
    nav: {
      marginTop: '10px',
    },
    navLink: {
      color: '#333',
      textDecoration: 'none',
      margin: '0 15px',
      fontSize: '20px',
      fontWeight: 'bold',
      transition: 'color 0.3s ease, transform 0.3s ease',
      display: 'inline-block',
    },
    navLinkHover: {
      color: '#6a1b9a',
      transform: 'scale(1.1)',
    },
  };

  return (
    <header style={styles.header}>
      <h1 style={styles.headerTitle}>Elderly Companionship Assistance</h1>
      <nav style={styles.nav}>
        <Link
          to="/"
          style={styles.navLink}
          onMouseOver={(e) => (e.target.style.color = styles.navLinkHover.color, e.target.style.transform = styles.navLinkHover.transform)}
          onMouseOut={(e) => (e.target.style.color = '#333', e.target.style.transform = 'scale(1)')}
        >
          Home
        </Link>
        <Link
          to="/health"
          style={styles.navLink}
          onMouseOver={(e) => (e.target.style.color = styles.navLinkHover.color, e.target.style.transform = styles.navLinkHover.transform)}
          onMouseOut={(e) => (e.target.style.color = '#333', e.target.style.transform = 'scale(1)')}
        >
          Health
        </Link>
        <Link
          to="/finance"
          style={styles.navLink}
          onMouseOver={(e) => (e.target.style.color = styles.navLinkHover.color, e.target.style.transform = styles.navLinkHover.transform)}
          onMouseOut={(e) => (e.target.style.color = '#333', e.target.style.transform = 'scale(1)')}
        >
          Financial
        </Link>
        <Link
          to="/transport"
          style={styles.navLink}
          onMouseOver={(e) => (e.target.style.color = styles.navLinkHover.color, e.target.style.transform = styles.navLinkHover.transform)}
          onMouseOut={(e) => (e.target.style.color = '#333', e.target.style.transform = 'scale(1)')}
        >
          Transport
        </Link>
        <Link
          to="/isolation"
          style={styles.navLink}
          onMouseOver={(e) => (e.target.style.color = styles.navLinkHover.color, e.target.style.transform = styles.navLinkHover.transform)}
          onMouseOut={(e) => (e.target.style.color = '#333', e.target.style.transform = 'scale(1)')}
        >
          Community
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
