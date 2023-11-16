import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Molecules from './Molecules';
import ScatterPlot from './ScatterPlot';
import Scatter from "./Scatter";
import Histogram from "./Histogram";
import TableComponent from './TableComponent';
import ReactDOM from "react-dom";



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
  return (
    <>
      <div className="container">
        <h1 className="my-4">Mof Vis</h1>
        <div className="row">
          {/* <Block title="Block 1" linkTo="/molecule-vis" /> */}
          <div className="col-md-6">
            <div className="card-body">
              <TableComponent></TableComponent>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <Molecules></Molecules>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card-body">
            <Histogram/>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card-body">
              {/* <div className={'shadow'} style={{'height':'23vw','width':'calc(48vw - 10em)','maxHeight':'80vh','display':'inline-block','margin':'3px'}}>
                <ScatterPlot></ScatterPlot>
              </div> */}
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
