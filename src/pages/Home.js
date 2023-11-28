import React, { useRef } from 'react';
import Molecules from './Molecules';
import Scatter from './Scatter';
import Histogram from './Histogram';
import TableComponent from './TableComponent';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import getData from '../loaders/jsonLoader';
import { data } from './data';
import Violin from './Violin';

const Home = () => {
  const [selectedMof, setSelectedMof] = React.useState('hMOF-0');
  const fileInputRef = useRef(null);

  const handleButtonClick = (event) => {
    event.preventDefault();
    fileInputRef.current.click();
  };

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
        setSelectedMof(fileName);
      }
    } catch (error) {
      console.log({ error });
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
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  accept=".pdb"
                  onChange={handleFileUpload}
                />
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
