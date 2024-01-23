import React, { useEffect, useState } from 'react'
import Logo from '../src/images/Netflix_Logomark.png'
import Avatar from '../src/images/Avatar.png'
import './Nav.css'

function Nav() {
    const [show, handleShow] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 100) {
          handleShow(true);
        } else {
          handleShow(false);
        }
      };
    
      window.addEventListener("scroll", handleScroll);
    
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
    
  return (
    <div className={`nav ${show && "nav__black"}`}> 
        <img 
            className='nav__logo'
            src={Logo}
            alt='Netflix Logo'
        />
         <img 
            className='nav__logo2'
            src={Avatar}
            alt='Netflix Avatar'
        />

    </div>
  )
}

export default Nav