import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import health from '../assets/health.png';
import finance from '../assets/finance.jpeg.jpg';
import transport from '../assets/transport.jpg';
import isolation from '../assets/isolation.png';
import background from '../assets/more_translucent_elderly_care_scene.png'; // Import background image
import { Helmet } from 'react-helmet';
// import Footer from './Footer';

const Home = () => {
  const [hoveredService, setHoveredService] = useState(null);

  const servicesData = [
    {
      id: 'health',
      title: 'Health Assistance',
      image: health,
      link: '/health',
    },
    {
      id: 'finance',
      title: 'Financial Aid',
      image: finance,
      link: '/finance',
    },
    {
      id: 'transport',
      title: 'Transport Service',
      image: transport,
      link: '/transport',
    },
    {
      id: 'isolation',
      title: 'Community Support',
      image: isolation,
      link: '/isolation',
    },
  ];

  const styles = {
    body: {
      margin: '0',
      fontFamily: 'Arial, sans-serif',
      backgroundImage: `url(${background})`, // Use the imported background image
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
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      width: '20%',
      cursor: 'pointer',
    },
    serviceHover: {
      transform: 'scale(1.05)',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
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
      position: 'relative',
      bottom: '0',
      width: '100%',
      boxShadow: '0 -4px 8px rgba(0, 0, 0, 0.2)',
    },
  };

  return (
    <>
    <Helmet>
      <title>Vridhub</title>
    </Helmet>
    <div style={styles.body}>
      <div style={styles.content}>
        <h2 style={styles.contentTitle}>Empowering Seniors, Enhancing Lives</h2>
        <div style={styles.services}>
          {servicesData.map((service) => (
            <div
              key={service.id}
              style={{
                ...styles.service,
                ...(hoveredService === service.id ? styles.serviceHover : {}),
              }}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <Link to={service.link}>
                <img src={service.image} alt={service.title} style={styles.serviceImage} />
              </Link>
              <p style={styles.serviceText}>{service.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    <footer style={styles.footer}>
            Designed By: Byte Busters
        </footer>
    </>
  );
};

export default Home;
