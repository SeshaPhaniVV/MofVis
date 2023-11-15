import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';
import './App.css';
import Molecules from './pages/Molecules';
import Home from './pages/Home';

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
