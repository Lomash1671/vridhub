import React from 'react';
import { Link } from 'react-router-dom';
import health from '../assets/health.png';
import finance from '../assets/finance.jpeg.jpg';
import transport from '../assets/transport.jpg';
import isolation from '../assets/isolation.png';

const Home = () => {
  const styles = {
    body: {
      margin: '0',
      fontFamily: 'Arial, sans-serif',
      backgroundImage: 'url("/assets/more_translucent_elderly_care_scene.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: '#333',
    },
    header: {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      padding: '20px',
      textAlign: 'center',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      position: 'sticky',
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
    content: {
      textAlign: 'center',
      padding: '100px 20px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      margin: '40px 20px',
      borderRadius: '15px',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
    },
    contentTitle: {
      fontSize: '32px',
      color: '#6a1b9a',
      marginBottom: '20px',
    },
    services: {
      display: 'flex',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
    },
    service: {
      textAlign: 'center',
      margin: '20px',
      padding: '20px',
      borderRadius: '15px',
      backgroundColor: 'white',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s, boxShadow 0.3s',
      width: '150px',
    },
    serviceImage: {
      width: '80px',
      height: '80px',
      marginBottom: '10px',
    },
    serviceText: {
      fontSize: '18px',
      margin: '0',
    },
    footer: {
      textAlign: 'center',
      padding: '20px',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      fontSize: '16px',
      position: 'fixed',
      bottom: '0',
      width: '100%',
      boxShadow: '0 -4px 8px rgba(0, 0, 0, 0.2)',
    },
  };

  return (
    <div style={styles.body}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>Elderly Companionship Assistance</h1>
        <nav style={styles.nav}>
          <Link to="/" style={styles.navLink}>Home</Link>
          <Link to="/about" style={styles.navLink}>About Us</Link>
          <Link to="/services" style={styles.navLink}>Services</Link>
          <Link to="/contact" style={styles.navLink}>Contact Us</Link>
        </nav>
      </header>

      <div style={styles.content}>
        <h2 style={styles.contentTitle}>Empowering Seniors, Enhancing Lives</h2>
        <div style={styles.services}>
          <div style={styles.service}>
            <Link to="/health">
              <img src={health} alt="Health Assistance" style={styles.serviceImage} />
            </Link>
            <p style={styles.serviceText}>Health Assistance</p>
          </div>
          <div style={styles.service}>
            <Link to="/finance">
              <img src={finance} alt="Financial Aid" style={styles.serviceImage} />
            </Link>
            <p style={styles.serviceText}>Financial Aid</p>
          </div>
          <div style={styles.service}>
            <Link to="/transport">
              <img src={transport} alt="Transport Service" style={styles.serviceImage} />
            </Link>
            <p style={styles.serviceText}>Transport Service</p>
          </div>
          <div style={styles.service}>
            <Link to="/isolation">
              <img src={isolation} alt="Community Support" style={styles.serviceImage} />
            </Link>
            <p style={styles.serviceText}>Community Support</p>
          </div>
        </div>
      </div>

      <footer style={styles.footer}>
        Designed By: Byte Busters
      </footer>
    </div>
  );
};

export default Home;
