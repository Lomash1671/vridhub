import React from 'react'

const Intergenerational = () => {
  const containerStyle = {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #6a1b9a, #8e44ad)',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
  };

  const titleStyle = {
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '20px',
  };

  const subtitleStyle = {
    fontSize: '24px',
    marginBottom: '40px',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const inputStyle = {
    padding: '10px',
    fontSize: '16px',
    marginBottom: '20px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    width: '300px',
    textAlign: 'center',
  };

  const buttonStyle = {
    backgroundColor: '#fff',
    color: '#6a1b9a',
    border: 'none',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  };

  const footerStyle = {
    marginTop: '40px',
    color: '#ddd',
    fontSize: '14px',
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Intergenerational Hub</h1>
      <p style={subtitleStyle}>We are launching soon. Stay tuned!</p>
      
      <form style={formStyle}>
        <input
          type="email"
          placeholder="Enter your email for updates"
          style={inputStyle}
        />
        <button
          type="submit"
          style={buttonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#ddd')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#fff')}
        >
          Notify Me
        </button>
      </form>

      <div style={footerStyle}>
        © {new Date().getFullYear()} Community Hub | All rights reserved
      </div>
    </div>
  );
};

export default Intergenerational