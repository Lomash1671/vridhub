import React, { useState } from 'react';
import supabase from '../../../supabase'; // Import Supabase client

const BookCab = () => {
  const [contrast, setContrast] = useState(false);
  const [largerText, setLargerText] = useState(false);
  const [message, setMessage] = useState('');

  const toggleContrast = () => setContrast(!contrast);
  const toggleLargerText = () => setLargerText(!largerText);

  const handleBooking = async (event) => {
    event.preventDefault();
  
    const form = event.target;
    const pickup = form.cabPickup.value;
    const dropoff = form.cabDropoff.value;
    const date = form.cabDate.value;
    const time = form.cabTime.value;
  
    if (pickup && dropoff && date && time) {
      const { data, error } = await supabase
        .from('Booking')
        .insert([
          {
            Pickuplocation: pickup,
            Dropofflocation: dropoff,
            Traveldate: date,
            Prefertime: time,
          },
        ]);
  
      if (error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage(`Cab booked from ${pickup} to ${dropoff} on ${date} at ${time}.`);
        setTimeout(() => {
          form.reset(); // Reset the form fields
          setMessage(''); // Clear the message after resetting
        }, 5000); // Reset after 5 seconds
      }
    } else {
      setMessage('Please fill in all fields.');
    }
  };

  const containerStyle = {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f4',
    color: '#333',
    margin: 0,
    padding: 0,
    fontSize: largerText ? '22px' : '18px',
  };

  const headerStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    textAlign: 'center',
    padding: '20px',
    fontSize: '30px',
  };

  const navStyle = {
    backgroundColor: '#333',
    padding: '15px',
    textAlign: 'center',
  };

  const navLinkStyle = {
    color: 'white',
    fontSize: '20px',
    textDecoration: 'none',
    margin: '0 15px',
    padding: '10px 15px',
  };

  const navLinkHoverStyle = {
    backgroundColor: '#575757',
    borderRadius: '5px',
  };

  const sectionStyle = {
    backgroundColor: 'white',
    margin: '20px 0',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  };

  const buttonStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    fontSize: '14px', // Smaller font size
    border: 'none',
    padding: '10px 15px', // Smaller padding
    margin: '0 5px', // Space between buttons
    cursor: 'pointer',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
  };

  const buttonHoverStyle = {
    backgroundColor: '#388E3C',
  };

  const inputStyle = {
    fontSize: '18px',
    padding: '15px',
    width: '100%',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
  };

  const footerStyle = {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#333',
    color: 'white',
    marginTop: '30px',
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px', // Space between buttons
    marginBottom: '20px',
  };

  return (
    <div
      style={{
        ...containerStyle,
        ...(contrast ? { backgroundColor: 'black', color: 'yellow' } : {}),
      }}
    >
      <header style={headerStyle}>
        Elderly-Friendly Transport Booking
      </header>

      <nav style={navStyle}>
        <a href="#book-cab" style={{ ...navLinkStyle, ...navLinkHoverStyle }}>Book Cab</a>
        <a href="#book-bus" style={{ ...navLinkStyle, ...navLinkHoverStyle }}>Book Bus</a>
        <a href="#book-train" style={{ ...navLinkStyle, ...navLinkHoverStyle }}>Book Train</a>
      </nav>

      <main style={{ padding: '20px' }}>
        <div style={buttonContainerStyle}>
          <button
            className="btn btn-primary"
            style={{ ...buttonStyle, backgroundColor: '#4CAF50' }}
            onClick={toggleContrast}
          >
            Toggle High Contrast
          </button>
          <button
            className="btn btn-primary"
            style={{ ...buttonStyle, backgroundColor: '#4CAF50' }}
            onClick={toggleLargerText}
          >
            Larger Text
          </button>
          <button
            className="btn btn-primary"
            style={{ ...buttonStyle, backgroundColor: '#FF9800' }}
            onClick={() => alert('Read Aloud functionality not implemented.')}
          >
            Read Aloud
          </button>
        </div>

        <section id="book-cab" style={sectionStyle}>
          <h2 style={{ color: '#4CAF50' }}>Book a Cab</h2>
          <form onSubmit={handleBooking}>
            <div className="mb-3">
              <label htmlFor="cabPickup">Pickup Location:</label>
              <input
                type="text"
                id="cabPickup"
                name="cabPickup"
                placeholder="Enter Pickup Location"
                style={inputStyle}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cabDropoff">Dropoff Location:</label>
              <input
                type="text"
                id="cabDropoff"
                name="cabDropoff"
                placeholder="Enter Dropoff Location"
                style={inputStyle}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cabDate">Travel Date:</label>
              <input
                type="date"
                id="cabDate"
                name="cabDate"
                style={inputStyle}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cabTime">Preferred Time:</label>
              <input
                type="time"
                id="cabTime"
                name="cabTime"
                style={inputStyle}
                required
              />
            </div>
            <input
              type="submit"
              value="Book Now"
              className="btn btn-primary"
              style={{ ...buttonStyle, backgroundColor: '#4CAF50' }}
            />
          </form>
          <p style={{ color: 'green', fontWeight: 'bold' }}>{message}</p>
        </section>
      </main>
    </div>
  );
};

export default BookCab;
