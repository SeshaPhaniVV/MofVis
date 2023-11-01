import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';
import './App.css';
import Molecules from './pages/Molecules';
import Home from './pages/Home';

const Block = ({ title, linkTo }) => (
  <div className="col-md-3 mb-3">
    <div className="card">
      <div className="card-body">
        <Link to={linkTo}>{title}</Link>
      </div>
    </div>
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/molecule-vis',
    element: <Molecules />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
