import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Molecules from './Molecules';
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
        <div className="row">
          <div className="col-md-5">
            <div className="card-body">
              <Typography variant="h4" gutterBottom>
                MOF Visualization
              </Typography>
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
          <div className="col-md-6">
            <div className="card-body">
              <Histogram />
            </div>
          </div>
          <div className="col-md-6">
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
