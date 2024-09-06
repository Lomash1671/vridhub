import { useState } from 'react';
import {supabase} from '../../../supabase.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const PrescriptionManagement = () => {
  const [file, setFile] = useState(null);
  const [prescriptions, setPrescriptions] = useState([
    { name: 'Prescription 1', url: '#' },
    { name: 'Prescription 2', url: '#' },
  ]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const { data, error } = await supabase.storage
      .from('prescriptions')
      .upload(file.name, file);

    if (error) {
      console.error('Error uploading file:', error);
      return;
    }

    const { publicURL, error: urlError } = supabase.storage
      .from('prescriptions')
      .getPublicUrl(file.name);

    if (urlError) {
      console.error('Error getting public URL:', urlError);
      return;
    }

    setPrescriptions([
      ...prescriptions,
      { name: file.name, url: publicURL },
    ]);
    setFile(null);
  };

  return (
    <div>
      <header className="bg-primary text-white text-center p-4">
        Prescription Management
      </header>

      <main className="d-flex flex-column align-items-center justify-content-center min-vh-100 p-4">
        <div className="container bg-white p-4 rounded shadow mb-4">
          <section>
            <h2 className="text-primary mb-4">View Your Prescriptions</h2>
            <ul className="list-unstyled">
              {prescriptions.map((prescription, index) => (
                <li
                  key={index}
                  className="bg-light p-3 mb-2 rounded d-flex justify-content-between align-items-center shadow-sm"
                >
                  {prescription.name}: 
                  <a href={prescription.url} target="_blank" rel="noopener noreferrer">
                    Download/View
                  </a>
                  <button className="btn btn-primary btn-sm">Update</button>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="container bg-white p-4 rounded shadow">
          <section>
            <h2 className="text-primary mb-4">Upload New Prescription</h2>
            <div className="d-flex flex-column align-items-center mb-4">
              <label htmlFor="prescriptionUpload" className="form-label">
                Select Prescription:
              </label>
              <input
                type="file"
                id="prescriptionUpload"
                accept=".pdf,.jpg,.png"
                className="form-control"
                onChange={handleFileChange}
              />
            </div>
            <button className="btn btn-primary" onClick={handleUpload}>
              Upload
            </button>
          </section>
        </div>
      </main>
    </div>
  );
};

export default PrescriptionManagement;
