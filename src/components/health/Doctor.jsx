import React, { useEffect, useState } from 'react';
import supabase from '../../../supabase'; // import supabase client
import { Button, Form, Container, Alert } from 'react-bootstrap';

const Doctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [DoctorName, setDoctorName] = useState('');
  const [Speciality, setSpeciality] = useState('');
  const [Contact, setContact] = useState('');
  const [Address, setAddress] = useState('');
  const [editingDoctorId, setEditingDoctorId] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', variant: '' });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    const { data, error } = await supabase.from('Doctor_info').select('*');
    if (error) {
      setAlert({ show: true, message: 'Error fetching doctors.', variant: 'danger' });
    } else {
      setDoctors(data);
    }
  };

  const addDoctor = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from('Doctor_info').insert([
      { name: DoctorName, Speciality, Contact, Address },
    ]);
    
    if (error) {
      setAlert({ show: true, message: 'Error adding doctor.', variant: 'danger' });
    } else if (data && data.length > 0) {
      setDoctors([...doctors, data[0]]);
      setAlert({ show: true, message: 'Doctor added successfully!', variant: 'success' });
      clearForm();
    } else {
      setAlert({ show: true, message: 'Doctor added but no data received.', variant: 'warning' });
    }
  };
  

  const updateDoctor = async (doctorId) => {
    const { error } = await supabase
      .from('Doctor_info')
      .update({ DoctorName, Speciality, Contact, Address })
      .eq('id', doctorId);

    if (error) {
      setAlert({ show: true, message: 'Error updating doctor.', variant: 'danger' });
    } else {
      fetchDoctors();
      setAlert({ show: true, message: 'Doctor updated successfully!', variant: 'success' });
      setEditingDoctorId(null);
      clearForm();
    }
  };

  const deleteDoctor = async (doctorId) => {
    const { error } = await supabase.from('Doctor_info').delete().eq('id', doctorId);
    if (error) {
      setAlert({ show: true, message: 'Error deleting doctor.', variant: 'danger' });
    } else {
      setDoctors(doctors.filter(doctor => doctor.id !== doctorId));
      setAlert({ show: true, message: 'Doctor deleted successfully!', variant: 'success' });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingDoctorId) {
      updateDoctor(editingDoctorId);
    } else {
      addDoctor(e);
    }
  };

  const handleEditClick = (doctor) => {
    setEditingDoctorId(doctor.id);
    setDoctorName(doctor.DoctorName);
    setSpeciality(doctor.Speciality);
    setContact(doctor.Contact);
    setAddress(doctor.Address);
  };

  const clearForm = () => {
    setDoctorName('');
    setSpeciality('');
    setContact('');
    setAddress('');
  };

  return (
    <Container>
      <header style={headerStyle}>Doctor Management</header>

      <main className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '80vh', padding: '20px' }}>
        <Container style={containerStyle}>
          <section>
            <h2 className="text-center" style={{ color: '#671d80' }}>Your Current Doctors</h2>
            {alert.show && (
              <Alert variant={alert.variant} onClose={() => setAlert({ ...alert, show: false })} dismissible>
                {alert.message}
              </Alert>
            )}
            <ul className="list-unstyled">
              {doctors.map(doctor => (
                <li key={doctor.id} className="d-flex justify-content-between align-items-center p-3 mb-3" style={doctorListItemStyle}>
                  <div className="flex-grow-1 pr-3">
                    <h3 style={{ color: '#671d80' }}>{doctor.DoctorName}</h3>
                    <p>Speciality: {doctor.Speciality}</p>
                    <p>Contact: {doctor.Contact}</p>
                    <p>Address: {doctor.Address}</p>
                  </div>
                  <Button
                    variant="primary"
                    className="mr-2"
                    onClick={() => handleEditClick(doctor)}
                    style={buttonStyle}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => deleteDoctor(doctor.id)}
                    style={deleteButtonStyle}
                  >
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
          </section>
        </Container>

        <Container style={containerStyle}>
          <section>
            <h2 className="text-center" style={{ color: '#671d80' }}>
              {editingDoctorId ? 'Edit Doctor' : 'Add New Doctor'}
            </h2>
            <Form onSubmit={handleFormSubmit}>
              <Form.Group controlId="DoctorName">
                <Form.Label>Doctor's Name:</Form.Label>
                <Form.Control
                  type="text"
                  value={DoctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="Speciality">
                <Form.Label>Speciality:</Form.Label>
                <Form.Control
                  type="text"
                  value={Speciality}
                  onChange={(e) => setSpeciality(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="Contact">
                <Form.Label>Contact Information:</Form.Label>
                <Form.Control
                  type="text"
                  value={Contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="Address">
                <Form.Label>Address:</Form.Label>
                <Form.Control
                  type="text"
                  value={Address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </Form.Group>
              <Button
                type="submit"
                className="btn-block"
                style={buttonStyle}
              >
                {editingDoctorId ? 'Update Doctor' : 'Add Doctor'}
              </Button>
            </Form>
          </section>
        </Container>
      </main>
    </Container>
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

const doctorListItemStyle = {
  backgroundColor: '#e3f2fd',
  border: '1px solid #bbdefb',
  borderRadius: '10px',
  transition: 'transform 0.2s',
};

const buttonStyle = {
  backgroundColor: '#671d80',
  borderColor: '#671d80',
  transition: 'background-color 0.3s',
  padding: '10px 20px',
  margin: '5px',
};

const deleteButtonStyle = {
  backgroundColor: '#e53935',
  borderColor: '#e53935',
  transition: 'background-color 0.3s',
  padding: '10px 20px',
  margin: '5px',
};

export default Doctor;
