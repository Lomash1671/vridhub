import React, { useState } from 'react';

const Intergenerational = () => {
  const [info, setInfo] = useState({
    info1: false,
    info2: false,
    info3: false,
  });

  const toggleInfo = (id) => {
    setInfo((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const styles = {
    body: {
      fontFamily: "'Helvetica Neue', Arial, sans-serif",
      margin: 0,
      padding: 0,
      backgroundColor: '#f4f4f4',
      color: '#333',
    },
    header: {
      backgroundColor: '#34495E',
      color: 'white',
      textAlign: 'center',
      padding: '50px 0',
    },
    headerTitle: {
      fontSize: '2.5em',
      margin: 0,
    },
    headerSubtitle: {
      marginTop: '10px',
      fontSize: '1.2em',
    },
    nav: {
      position: 'sticky',
      top: 0,
      backgroundColor: '#34495E',
      overflow: 'hidden',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
    },
    navLink: {
      display: 'inline-block',
      color: 'white',
      padding: '14px 20px',
      textDecoration: 'none',
      fontWeight: 'bold',
    },
    navLinkHover: {
      backgroundColor: '#1ABC9C',
      color: 'white',
    },
    hero: {
      backgroundImage: 'url("elderly_children.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '400px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      textShadow: '2px 2px 5px #000',
      boxShadow: 'inset 0 0 0 1000px rgba(0, 0, 0, 0.5)',
    },
    heroTitle: {
      fontSize: '3em',
      margin: 0,
    },
    content: {
      padding: '60px 20px',
      textAlign: 'center',
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    contentTitle: {
      fontSize: '2.2em',
      color: '#2C3E50',
      marginBottom: '20px',
    },
    feature: {
      display: 'flex',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
      marginTop: '40px',
    },
    featureItem: {
      backgroundColor: '#f9f9f9',
      padding: '20px',
      width: '30%',
      margin: '10px',
      borderRadius: '10px',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s ease',
      textAlign: 'center',
    },
    featureItemHover: {
      transform: 'translateY(-5px)',
    },
    featureImage: {
      width: '100%',
      height: 'auto',
      borderRadius: '10px',
      marginBottom: '20px',
    },
    featureTitle: {
      fontSize: '1.5em',
      color: '#2C3E50',
      marginBottom: '15px',
    },
    featureDescription: {
      fontSize: '1em',
      color: '#666',
      marginBottom: '20px',
      lineHeight: '1.6',
    },
    featureButton: {
      padding: '12px 18px',
      backgroundColor: '#1ABC9C',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontWeight: 'bold',
      fontSize: '1em',
      transition: 'background-color 0.3s ease',
    },
    featureButtonHover: {
      backgroundColor: '#16A085',
    },
    footer: {
      backgroundColor: '#2C3E50',
      color: 'white',
      textAlign: 'center',
      padding: '20px',
    },
    moreInfo: {
      display: info.info1 ? 'block' : 'none',
    },
  };

  return (
    <div style={styles.body}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>Bridging Generations</h1>
        <p style={styles.headerSubtitle}>Connecting the Elderly with Orphans through Compassionate Meetups</p>
      </header>
      
      <nav style={styles.nav}>
        <a href="#home" style={styles.navLink}>Home</a>
        <a href="#features" style={styles.navLink}>Features</a>
        <a href="#about" style={styles.navLink}>About Us</a>
        <a href="#contact" style={styles.navLink}>Contact Us</a>
      </nav>
      
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>Bridging the Gap Between Generations</h1>
      </section>
      
      <section style={styles.content} id="features">
        <h2 style={styles.contentTitle}>Our Features</h2>
        <div style={styles.feature}>
          <div style={styles.featureItem}>
            <img src="intergenerational_meetup.jpg" alt="Intergenerational Meetups" style={styles.featureImage} />
            <h3 style={styles.featureTitle}>Intergenerational Meetups</h3>
            <p style={styles.featureDescription}>Organize and participate in meetups that bring the elderly and orphans together for shared activities and companionship.</p>
            <button
              style={styles.featureButton}
              onClick={() => toggleInfo('info1')}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.featureButtonHover.backgroundColor)}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.featureButton.backgroundColor)}
            >
              Learn More
            </button>
            {info.info1 && (
              <div style={styles.moreInfo}>
                <p>These meetups are designed to foster mutual understanding and emotional support between the elderly and orphans, helping to build lasting relationships.</p>
              </div>
            )}
          </div>
          <div style={styles.featureItem}>
            <img src="skill_sharing.jpg" alt="Skill Sharing" style={styles.featureImage} />
            <h3 style={styles.featureTitle}>Skill Sharing</h3>
            <p style={styles.featureDescription}>Elderly participants can share their life skills and experiences with the younger generation, offering guidance and wisdom.</p>
            <button
              style={styles.featureButton}
              onClick={() => toggleInfo('info2')}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.featureButtonHover.backgroundColor)}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.featureButton.backgroundColor)}
            >
              Learn More
            </button>
            {info.info2 && (
              <div style={styles.moreInfo}>
                <p>From storytelling to craft making, these sessions provide a platform for the elderly to pass on their knowledge and for orphans to learn valuable life lessons.</p>
              </div>
            )}
          </div>
          <div style={styles.featureItem}>
            <img src="community_support.jpg" alt="Community Support" style={styles.featureImage} />
            <h3 style={styles.featureTitle}>Community Support</h3>
            <p style={styles.featureDescription}>Build a supportive community where both the elderly and orphans can find companionship, understanding, and care.</p>
            <button
              style={styles.featureButton}
              onClick={() => toggleInfo('info3')}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.featureButtonHover.backgroundColor)}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.featureButton.backgroundColor)}
            >
              Learn More
            </button>
            {info.info3 && (
              <div style={styles.moreInfo}>
                <p>Our programs focus on creating a sense of belonging and emotional security through regular interaction and community-building activities.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Intergenerational;
