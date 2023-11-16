import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Molecules from './Molecules';
import ScatterPlot from './ScatterPlot';
import Scatter from './Scatter';
import Histogram from './Histogram';
import TableComponent from './TableComponent';
import ReactDOM from 'react-dom';
import Typography from '@mui/material/Typography';

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

  return (
    <>
      <div className="container">
        <Typography variant="h3" gutterBottom>
          MOF Visualization
        </Typography>
        <div className="row">
          <div className="col-md-5">
            <div className="card-body">
              <TableComponent setSelectedMof={setSelectedMof}></TableComponent>
            </div>
          </div>
          <div className="col-md-7">
            <div className="card-body">
              <Molecules selectedMof={selectedMof}></Molecules>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <Histogram />
            </div>
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <div className="App">
                    <Scatter />
                  </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
