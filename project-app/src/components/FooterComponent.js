import '../styling/footer.css'
import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom';

const FooterComponent = () => {
  return (
    <>
      <div className='footer'>
        <p className='developers'>Developers: Justin King, Jeff Noland, Tyler Overholts, Josh Beasley, and Jason Flowers</p>
        <p className='copyright'>Copyright 2022 Galvanize</p>
      </div>
    </>
  );
}

export default FooterComponent