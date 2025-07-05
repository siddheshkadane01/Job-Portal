import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets, JobCategories, JobLocations } from '../assets/assets'
import JobCard from './JobCard'

const JobListing = () => {
  const { isSearched, stateSearchFilter, setSearchFilter, jobs } = useContext(AppContext)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedLocations, setSelectedLocations] = useState([])

  const [filteredJobs, setfilteredJobs] = useState(jobs)

  const handelCategoryChange  = (category) => {
    setSelectedCategories(
        prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    )
  }

  const handelLocationChange  = (location) => {
    setSelectedLocations(
        prev => prev.includes(location) ? prev.filter(c => c !== location) : [...prev, location]
    )
  }

  useEffect(()=>{
    const matchesCategory = job => selectedCategories.length === 0  || selectedCategories.includes(job.category)
    const matchesLocation = job => selectedLocations.length === 0 || selectedLocations.includes(job.location)
    // FIX: Use stateSearchFilter, not searchFilter
    const matchesTitle = job => stateSearchFilter.title === '' || job.title.toLowerCase().includes(stateSearchFilter.title.toLowerCase())
    const matchesSearchLocation = job => stateSearchFilter.location === '' || job.location.toLowerCase().includes(stateSearchFilter.location.toLowerCase())

    const newFilteredJobs = jobs.slice().reverse().filter(
        job => matchesCategory(job) && matchesLocation(job) && matchesTitle(job) && matchesSearchLocation(job)
    )

    setfilteredJobs(newFilteredJobs)
    setCurrentPage(1) // Reset to first page when filters change
  }, [jobs, selectedCategories, selectedLocations, stateSearchFilter])

  // Pagination logic
  const paginatedJobs = filteredJobs.slice((currentPage - 1) * 6, currentPage * 6)
  const totalPages = Math.ceil(filteredJobs.length / 6)

  return (
    <div className='container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8'>
      {/* Sidebar */}
      <div className='w-full lg:w-1/4 bg-white px-4'>
        {isSearched && (stateSearchFilter.title !== '' || stateSearchFilter.location !== '') && (
          <>
            <h3 className='font-medium text-lg mb-4'>Current Search</h3>
            <div className='mb-4 text-gray-600'>
              {stateSearchFilter.title && (
                <span className='inline-flex items-center gap-2.5 bg-blue-50 border-blue-50 border px-4 py-1 rounded'>
                  {stateSearchFilter.title}
                  <img onClick={e => setSearchFilter(prev => ({...prev, title:''}))} className='cursor-pointer' src={assets.cross_icon} alt="" />
                </span>
              )}
              {stateSearchFilter.location && (
                <span className='inline-flex ml-2 items-center gap-2.5 bg-red-50 border-red-50 border px-4 py-1 rounded'>
                  {stateSearchFilter.location}
                  <img onClick={e => setSearchFilter(prev => ({...prev, location:''}))} className='cursor-pointer' src={assets.cross_icon} alt="" />
                </span>
              )}
            </div>
          </>
        )}

        {/* Categories */}
        <div className='max-lg:hidden'>
          <h4 className='font-medium text-lg py-4'>Search by Categories</h4>
          <ul className='space-y-4 text-gray-600'>
            {
              JobCategories.map((category, index) => (
                <li className='flex gap-3 items-center' key={index}>
                  <input 
                    className='scale-125' 
                    type='checkbox' 
                    onChange={() => handelCategoryChange(category)} 
                    checked={selectedCategories.includes(category)}
                  />
                  {category}
                </li>
              ))
            }
          </ul>
        </div>

        {/* Location Filter */}
        <div className='max-lg:hidden'>
          <h4 className='font-medium text-lg py-4 pt-14'>Search by Location</h4>
          <ul className='space-y-4 text-gray-600'>
            {
              JobLocations.map((location, index) => (
                <li className='flex gap-3 items-center' key={index}>
                  <input 
                    className='scale-125' 
                    type='checkbox' 
                    onChange={() => handelLocationChange(location)} 
                    checked={selectedLocations.includes(location)} 
                  />
                  {location}
                </li>
              ))
            }
          </ul>
        </div>
      </div>
      {/* Job Listings */}
      <section className='w-full lg:w-3/4 text-gray-800 max-lg:px-4'>
        <h3 className='font-medium text-3xl py-2' id='job-list'>Latest Openings</h3>
        <p className='mb-8'>Get your desired job from top companies</p>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {paginatedJobs.map((job, index) => (
            <JobCard key={index} job={job}/>
          ))}
        </div>

        {/* Pagination */}
        {filteredJobs.length > 0 && (
          <div className='flex items-center justify-center space-x-2 mt-10'>
            <a href='#job-list'>
              <img 
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} 
                src={assets.left_arrow_icon} 
                alt="Previous" 
                style={{ cursor: currentPage === 1 ? 'not-allowed' : 'pointer', opacity: currentPage === 1 ? 0.5 : 1 }}
              />
            </a>
            {Array.from({ length: totalPages }).map((_, index) => (
              <a href='#job-list' key={index}>
                <button
                  className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${currentPage === index + 1 ? 'bg-blue-100 text-blue-500' : 'text-gray-500'}`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              </a>
            ))}
            <a href='#job-list'>
              <img 
                onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))} 
                src={assets.right_arrow_icon} 
                alt="Next" 
                style={{ cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', opacity: currentPage === totalPages ? 0.5 : 1 }}
              />
            </a>
          </div>
        )}
      </section>
    </div>
  )
}

export default JobListing