import React from 'react';
import { Link } from 'react-router-dom';
import health from '../assets/health.png';
import finance from '../assets/finance.jpeg.jpg';
import transport from '../assets/transport.jpg';
import isolation from '../assets/isolation.png';
import Navbar from './Navbar';

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
    
  };

  return (
    <div style={styles.body}>
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
    </div>
  );
};

export default Home;
