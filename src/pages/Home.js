import React, { useEffect, useRef } from 'react';
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
import { PDBLoader } from 'three/addons/loaders/PDBLoader.js';
import CircularProgress from '@mui/material/CircularProgress';

const map = {
  'hMOF-0': 'caffeine',
  'hMOF-1': 'cocaine',
  'hMOF-2': 'cholesterol',
  'hMOF-3': 'diamond',
  'hMOF-4': 'glucose',
  'hMOF-5': 'graphite',
  'hMOF-6': 'lsd',
  'hMOF-7': 'lycopene',
  'hMOF-8': 'nicotine',
  'hMOF-9': 'ala_phe_ala',
  'hMOF-10': 'Al2O3',
  'hMOF-11': 'aspirin',
  'hMOF-12': 'buckyball',
  'hMOF-13': 'caf2',
  'hMOF-14': 'cu',
  'hMOF-15': 'cubane',
};

const Home = () => {
  const [selectedMof, setSelectedMof] = React.useState('hMOF-0');
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [structures, setStructures] = React.useState({});

  const handleButtonClick = (event) => {
    event.preventDefault();
    fileInputRef.current.click();
  };

  useEffect(() => {
    const loader = new PDBLoader();

    function getStructureDetailsForMof(mofId) {
      return new Promise((resolve) => {
        const fileName = map[mofId] ? `${map[mofId]}.pdb` : 'caffeine.pdb';
        const url = 'models/' + fileName;

        loader.load(url, (pdb) => {
          const { atoms } = pdb.json;
          let res = {};
          console.log({ atoms });

          for (const [, , , , atom] of atoms) {
            if (res[atom]) res[atom]++;
            else res[atom] = 1;
          }

          resolve(res);
        });
      });
    }

    async function processStructures() {
      const tempStructures = {};
      const numberOfFiles = 15;

      for (let i = 0; i <= numberOfFiles; i++) {
        const customData = require(`./../json_data/hMOF-${i}.json`);
        tempStructures[customData.name] = await getStructureDetailsForMof(customData.name);
        console.log({ customData });
      }

      setStructures(tempStructures);
      setIsLoading(false);
    }

    processStructures();
  }, []);

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

  if (isLoading) {
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </div>;
  }

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
              <Histogram structuresData={structures} />
            </div>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <Scatter />
            </div>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <Violin width={600} height={400}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
