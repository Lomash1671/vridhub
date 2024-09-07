import React, { useState } from 'react';

const Prescription = () => {
  const [prescriptions, setPrescriptions] = useState([
    { id: 1, name: 'Prescription 1' },
    { id: 2, name: 'Prescription 2' },
  ]);

  const handleUpload = (e) => {
    // Handle file upload logic here
    console.log('File uploaded: ', e.target.files[0]);
  };

  const handleUpdate = (id) => {
    // Handle prescription update logic
    console.log(`Updating prescription ${id}`);
  };

  return (
    <div>
      <header style={headerStyle}>Prescription Management</header>

      <main className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '80vh', padding: '20px' }}>
        {/* Prescription List */}
        <div className="container" style={containerStyle}>
          <section>
            <h2 className="text-center" style={{ color: '#671d80' }}>View Your Prescriptions</h2>
            <ul className="list-unstyled">
              {prescriptions.map(prescription => (
                <li key={prescription.id} className="d-flex justify-content-between align-items-center p-3 mb-3" style={prescriptionListItemStyle}>
                  {prescription.name}: <a href="#" style={linkStyle}>Download/View</a>
                  <button className="btn btn-primary" onClick={() => handleUpdate(prescription.id)} style={updateButtonStyle}>Update</button>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Upload New Prescription */}
        <div className="container" style={containerStyle}>
          <section>
            <h2 className="text-center" style={{ color: '#671d80' }}>Upload New Prescription</h2>
            <div className="file-input text-center mb-3">
              <label htmlFor="prescriptionUpload" style={labelStyle}>Select Prescription:</label>
              <input type="file" id="prescriptionUpload" accept=".pdf,.jpg,.png" onChange={handleUpload} className="form-control-file" />
            </div>
            <button className="btn btn-primary btn-block" style={buttonStyle}>Upload</button>
          </section>
        </div>
      </main>
    </div>
  );
};

// Inline styles for custom color themes
const headerStyle = {
  backgroundColor: '#671d80',
  padding: '20px',
  textAlign: 'center',
  color: 'white',
  fontSize: '28px',
  fontWeight: 'bold',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
};

const containerStyle = {
  width: '90%',
  maxWidth: '800px',
  backgroundColor: 'white',
  borderRadius: '15px',
  boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
  padding: '30px',
  marginBottom: '20px',
};

const prescriptionListItemStyle = {
  backgroundColor: '#f1f8e9',
  border: '1px solid #c8e6c9',
  borderRadius: '10px',
  transition: 'transform 0.2s',
};

const linkStyle = {
  textDecoration: 'none',
  color: '#671d80',
  fontWeight: 'bold',
};

const updateButtonStyle = {
  backgroundColor: '#1976d2',
  borderColor: '#1976d2',
  transition: 'background-color 0.3s',
};

const buttonStyle = {
  backgroundColor: '#671d80',
  borderColor: '#671d80',
  transition: 'background-color 0.3s',
};

const labelStyle = {
  fontSize: '20px',
  marginBottom: '10px',
  cursor: 'pointer',
};

export default Prescription;
