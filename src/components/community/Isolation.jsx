import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import prescriptionImg from '../../assets/pres.jpg'; // Adjust the image path
import doctorImg from '../../assets/directory.jpg';  // Adjust the image path

// Tile data array
const tilesData = [
  {
    title: 'Community',
    imgSrc: prescriptionImg,
    link: '/isolation/community',
    alt: 'Community',
  },
  {
    title: 'Intergenerational',
    imgSrc: doctorImg,
    link: '/isolation/intergenerational',
    alt: 'Intergenerational',
  },
];

const Isolation = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleTileClick = (link) => {
    navigate(link); // Navigate to the link passed when tile is clicked
  };

  return (
    <div className="container text-center mt-4" style={{ fontFamily: 'Times New Roman, serif' }}>
      <h1 className="display-4 font-weight-bold">Comprehensive Elder Care</h1>

      <div className="row justify-content-center mt-5">
        {tilesData.map((tile, index) => (
          <div className="col-lg-4 col-md-6 mb-4" key={index}>
            <div className="card h-100" onClick={() => handleTileClick(tile.link)} style={{ cursor: 'pointer' }}>
              <img src={tile.imgSrc} alt={tile.alt} className="card-img-top img-fluid" />
              <div className="card-body">
                <h5 className="card-title">{tile.title}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Outlet />
    </div>
  );
};

export default Isolation;
