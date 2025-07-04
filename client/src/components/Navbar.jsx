import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'

const Navbar = () => {

  const {openSignIn} = useClerk()
  const {user} = useUser()


  return (
    <div className='shadow-lg backdrop-blur-md bg-white/95 py-4 sticky top-0 z-50 transition-all duration-300'>
        <div className='container px-4 mx-auto flex justify-between items-center'>
            <div className='flex items-center'>
                <img src={assets.logo} alt="" className='h-8 w-auto transition-transform duration-300 hover:scale-105' />
            </div>
            {
              user ? (
                <div className='flex items-center gap-6'>
                  <Link 
                    to='/applications' 
                    className='text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 relative group'
                  > 
                    Applied Jobs 
                    <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full'></span>
                  </Link>
                  <div className='w-px h-6 bg-gray-300'></div>
                  <div className='flex items-center gap-3'>
                    <p className='text-gray-600 text-sm'>
                      Hello, <span className='font-semibold text-gray-800'>{user.firstName+' '+user.lastName}</span>
                    </p>
                    <div className='relative'>
                      <UserButton 
                        appearance={{
                          elements: {
                            avatarBox: "w-8 h-8 ring-2 ring-blue-100 ring-offset-2 transition-all duration-300 hover:ring-blue-300"
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className='flex gap-4 max-sm:text-xs items-center'>
                  <button className='text-gray-500 hover:text-gray-700 transition-colors duration-200'>
                    Recruiter Login
                  </button>
                  <button 
                    onClick={e => openSignIn()} 
                    className='bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-2 rounded-md transition-colors duration-200'
                  >
                    Login
                  </button>
                </div>
              )
            }
            
        </div>
    </div>
  )
}

export default Navbar