// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from './views/Home/Home';
import Login from './views/Login/Login';
import SignUp  from './views/SignUp/SignUp';
import Navbar from './components/Navbar/Navbar';
import MyOrders from './views/MyOrders/MyOrders';
import BuyPage from './views/BuyPage/BuyPage';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/signup',
    element: <SignUp/>
  },
  {
    path: '/orders',
    element: <MyOrders/>
  },
  {
    path: '/buy/:id',
    element: <BuyPage/>
  },
  {
    path: '/navbar',
    element: <Navbar/>
  }
])
root.render(<RouterProvider router= {router}/>);

