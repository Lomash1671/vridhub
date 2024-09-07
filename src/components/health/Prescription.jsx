import React, { useState, useEffect } from 'react';
import supabase from '../../../supabase';

const Prescription = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [file, setFile] = useState(null);
  const [alert, setAlert] = useState({ message: '', type: '' }); // State for alert messages

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

  // Fetch prescriptions from Supabase
  useEffect(() => {
    const fetchPrescriptions = async () => {
      const { data, error } = await supabase
        .from('prescription')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) {
        console.error('Error fetching prescriptions: ', error);
      } else {
        setPrescriptions(data);
      }
    };

    fetchPrescriptions();
  }, []);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  // Upload the file to Supabase Storage and insert record in 'prescription' table
  const handleFileUpload = async () => {
    if (!file) {
      setAlert({ message: 'Please select a file first!', type: 'danger' });
      return;
    }

    const fileName = `${Date.now()}_${file.name}`; // Unique filename to avoid conflicts

    // Upload file to Supabase Storage
    const { data: storageData, error: uploadError } = await supabase.storage
      .from('prescriptions')  // Ensure this bucket name is correct
      .upload(fileName, file);

    if (uploadError) {
      console.error('Error uploading file: ', uploadError);
      setAlert({ message: 'Error uploading file. Please try again.', type: 'danger' });
      return;
    }

    // Construct file path for public access
    const filePath = `${supabaseUrl}/storage/v1/object/public/prescriptions/${fileName}`;

    // Insert file details into 'prescription' table
    const { data, error: insertError } = await supabase
      .from('prescription')
      .insert([{ file: file.name, file_path: filePath }]);

    if (insertError) {
      console.error('Error saving prescription to database: ', insertError);
      setAlert({ message: 'Error saving prescription to database. Please try again.', type: 'danger' });
    } else {
      setAlert({ message: 'Prescription uploaded successfully', type: 'success' });
      setFile(null); // Clear file input
      setPrescriptions([...prescriptions, { file: file.name, file_path: filePath }]); // Update local state
    }
  };

  // Handle prescription deletion
  const handleDelete = async (id, fileName) => {
    // Delete from Supabase Storage
    const { error: deleteStorageError } = await supabase.storage
      .from('prescriptions')
      .remove([fileName]);

    if (deleteStorageError) {
      console.error('Error deleting file from storage: ', deleteStorageError);
      setAlert({ message: 'Error deleting file from storage. Please try again.', type: 'danger' });
      return;
    }

    // Delete from 'prescription' table
    const { error: deleteDbError } = await supabase
      .from('prescription')
      .delete()
      .eq('id', id);

    if (deleteDbError) {
      console.error('Error deleting prescription from database: ', deleteDbError);
      setAlert({ message: 'Error deleting prescription from database. Please try again.', type: 'danger' });
      return;
    }

    // Update local state
    setPrescriptions(prescriptions.filter(prescription => prescription.id !== id));
    setAlert({ message: 'Prescription deleted successfully', type: 'success' });
  };

  return (
    <div>
      <header style={headerStyle}>Prescription Management</header>

      <main className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '80vh', padding: '20px' }}>
        {/* Display alert messages */}
        {alert.message && (
          <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
            {alert.message}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        )}

        {/* Prescription List */}
        <div className="container" style={containerStyle}>
          <section>
            <h2 className="text-center" style={{ color: '#671d80' }}>View Your Prescriptions</h2>
            <ul className="list-unstyled">
              {prescriptions.map((prescription) => (
                <li
                  key={prescription.id}
                  className="d-flex justify-content-between align-items-center p-3 mb-3"
                  style={prescriptionListItemStyle}
                >
                  {prescription.file}: <a href={prescription.file_path} target="_blank" rel="noopener noreferrer" style={linkStyle}>Download/View</a>
                  <button
                    onClick={() => handleDelete(prescription.id, `${Date.now()}_${prescription.file}`)} // Passing a unique filename for deletion
                    style={deleteButtonStyle}
                  >
                    Delete
                  </button>
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
              <input type="file" id="prescriptionUpload" accept=".pdf,.jpg,.png" onChange={handleFileChange} className="form-control-file" />
            </div>
            <button
              className="btn btn-primary btn-block"
              style={buttonStyle}
              onClick={handleFileUpload}
            >
              Upload
            </button>
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
  transition: 'transform 0.2s ease, background-color 0.2s ease',
  cursor: 'pointer',
  padding: '10px',
};

const linkStyle = {
  textDecoration: 'none',
  color: '#671d80',
  fontWeight: 'bold',
};

const buttonStyle = {
  backgroundColor: '#671d80',
  borderColor: '#671d80',
  color: 'white',
  transition: 'background-color 0.3s ease, transform 0.3s ease',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
};

const labelStyle = {
  display: 'block',
  marginBottom: '10px',
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#671d80',
};

const deleteButtonStyle = {
  backgroundColor: '#d32f2f',
  borderColor: '#d32f2f',
  color: 'white',
  transition: 'background-color 0.3s ease, transform 0.3s ease',
  padding: '5px 10px',
  borderRadius: '5px',
  cursor: 'pointer',
  border: 'none',
};

export default Prescription;
