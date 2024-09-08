import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
    const styles = {
        footer: {
            textAlign: 'center',
            padding: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            fontSize: '16px',
            position: 'fixed',
            bottom: '0',
            width: '100%',
            boxShadow: '0 -4px 8px rgba(0, 0, 0, 0.2)',
            zIndex: '1000',  // To make sure it's always on top
        },
    };
  
    return (
        <footer style={styles.footer}>
            Designed By: Byte Busters
        </footer>
    );
};

export default Footer;
