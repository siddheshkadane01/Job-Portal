import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='container px-4 2xl:px-20 mx-auto flex items-center justify-between py-8 border-t mt-10'>
      <img className='px-3' width={160} src={assets.logo} alt="" />
      <p className='flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500'>
        © {new Date().getFullYear()} Siddhesh Kadane. All rights reserved.
      </p>
      <div className='flex gap-2.5'>
        <img width={38} src={assets.facebook_icon} alt="" />
        <img width={38} src={assets.twitter_icon} alt="" />
        <img width={38} src={assets.instagram_icon} alt="" />
      </div>
    </div>
  )
}

export default Footer