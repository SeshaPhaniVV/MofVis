import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

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
          <Block title="Block 1" linkTo="/molecule-vis" />
          <Block title="Block 2" linkTo="/molecule-vis" />
          <Block title="Block 3" linkTo="/molecule-vis" />
          <Block title="Block 4" linkTo="/molecule-vis" />
        </div>
      </div>
    </>
  );
};

export default Home;
