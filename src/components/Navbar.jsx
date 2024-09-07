import React from 'react'
import { Link } from 'react-router-dom'

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
            transition: 'color 0.3s',
          },
    }
  return (
    <header style={styles.header}>
    <h1 style={styles.headerTitle}>Elderly Companionship Assistance</h1>
    <nav style={styles.nav}>
      <Link to="/" style={styles.navLink}>Home</Link>
      <Link to="/about" style={styles.navLink}>About Us</Link>
      <Link to="/services" style={styles.navLink}>Services</Link>
      <Link to="/contact" style={styles.navLink}>Contact Us</Link>
    </nav>
  </header>
  )
}

export default Navbar