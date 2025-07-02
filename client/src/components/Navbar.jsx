
import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <div>
            <img src={assets.logo} alt="" />
        </div>
        <nav>
            <Link to="/">Home</Link> | <Link to="/applications">Applications</Link>
        </nav>
    </div>
  )
}

export default Navbar