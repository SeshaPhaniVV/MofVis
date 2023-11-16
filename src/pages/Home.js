import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Molecules from './Molecules';
import Scatter from './Scatter';
import Histogram from './Histogram';
import TableComponent from './TableComponent';
import ReactDOM from 'react-dom';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';

const Block = ({ title, linkTo }) => (
  <div className="col-md-6">
    <div className="card mb-4">
      <div className="card-body">
        <Link to={linkTo}>{title}</Link>
      </div>
    </div>
  </div>
);

const Home = () => {
  const [selectedMof, setSelectedMof] = React.useState('hMOF-0');
  const fileInputRef = useRef(null);
  const [outputMessage, setOutputMessage] = useState('');

  const handleButtonClick = (event) => {
    event.preventDefault();
    fileInputRef.current.click();
  };

  function handleUploadClick() {
    console.log('upload clicked');
  }

  const handleFileUpload = async (event) => {
    event.preventDefault();
    try {
      const file = event.target.files[0];
      if (!file) return;
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://localhost:5000/upload_and_convert', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        const fileName = file.name;
        const fileNameWithoutExtension = fileName.substring(0, fileName.lastIndexOf('.')) || fileName;

        // Update the state with the file name without extension
        setSelectedMof(fileNameWithoutExtension);
        setOutputMessage(`File converted successfully: ${response.data.success}`);
      } else {
        setOutputMessage(`Error: ${response.data.error}`);
      }
    } catch (error) {
      setOutputMessage('An error occurred while uploading and converting the file.');
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <Typography variant="h4" gutterBottom>
                  MOF Visualization
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<CloudUploadIcon />}
                  style={{ marginLeft: '100px' }}
                  onClick={handleButtonClick}
                >
                  Upload
                </Button>
                <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileUpload} />
              </div>
              <TableComponent setSelectedMof={setSelectedMof} />
            </div>
          </div>
          <div className="col-md-7">
            <div className="card-body">
              <Molecules selectedMof={selectedMof} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="card-body">
              <Histogram />
            </div>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <Scatter />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
