import React, { useState } from 'react';
import {Link} from 'react-router-dom';

function Navbar() {
  const [user, setUser] = useState({});

  return (
   <>
    <div className='navbar'>
      <Link to="/" className='navbar-brand'>
        Aapna-Mart🛍️
      </Link>

      <div>
        <Link to="/login" className='navbar-link'>
          Login
        </Link>

        <Link to="/signup" className='navbar-link'>
         SignUp
        </Link>

        <Link to="/orders" className='navbar-link'>
          MyOrders
        </Link>
      </div>

      <div>
        Hello, {user.name}
      </div>
    </div>
   </>
  )
}

export default Navbar