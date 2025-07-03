
import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='shadow py-4'>
        <div className='container px-4 mx-auto flex justify-between items-center'>
            <img src={assets.logo} alt="" />
            <div>
              <button>Recruter Login</button>
              <button>Login</button>
            </div>
        </div>
    </div>
  )
}

export default Navbar