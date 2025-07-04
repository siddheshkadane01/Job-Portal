import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero.jsx'
import JobListing from '../components/JobListing.jsx'

const Home = () => {
  return (
    <div>
      <Hero />
      <JobListing />
    </div>
  )
}

export default Home