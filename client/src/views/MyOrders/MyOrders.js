import React, { useState, useEffect } from 'react';
import './MyOrders.css';
import Navbar from '../../components/Navbar/Navbar';

function MyOrders() {

    const [user, setUser] = useState({});

    

  return (
   <>
   <Navbar/>
   <h1 className='text-center'>My Orders</h1>
   </>
  )
}

export default MyOrders