import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

const ApplyJob = () => {
  const { id } = useParams()
  const [jobData, setJobData] = useState(null)
  const { jobs } = useContext(AppContext)

  useEffect(() => {
    if (jobs && jobs.length > 0) {
      const data = jobs.filter(job => job._id === id)
      if (data.length !== 0){
        setJobData(data[0])
      }
    }
  }, [id, jobs])

  // Find more jobs from the same company (dummy: by company_icon or company name)
  const moreJobs = jobs && jobData
    ? jobs.filter(job => job.companyId === jobData.companyId && job._id !== jobData._id)
    : []

  return (
    <div className="container mx-auto px-4 2xl:px-20 py-10 flex flex-col lg:flex-row gap-8">
      {/* Main Content */}
      <div className="w-full lg:w-3/4">
        {/* Job Card */}
        {jobData && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between mb-10">
            <div className="flex items-center gap-6 flex-1">
              <img src={assets.company_icon} alt="" className="w-20 h-20 rounded-lg bg-white border" />
              <div>
                <h1 className="text-3xl font-semibold mb-2">{jobData.title}</h1>
                <div className="flex flex-wrap gap-4 text-gray-500 text-sm">
                  <span className="flex items-center gap-1">
                    <img src={assets.company_icon} alt="" className="w-5 h-5" />
                    {jobData.company || "Slack"}
                  </span>
                  <span className="flex items-center gap-1">
                    <img src={assets.location_icon} alt="" className="w-4 h-4" />
                    {jobData.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <img src={assets.level_icon} alt="" className="w-4 h-4" />
                    {jobData.level}
                  </span>
                  <span className="flex items-center gap-1">
                    <img src={assets.salary_icon} alt="" className="w-4 h-4" />
                    CTC: {jobData.salary ? `₹${jobData.salary}` : "$80k"}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2 mt-6 md:mt-0">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium shadow hover:bg-blue-700 transition">
                Apply now
              </button>
              <span className="text-xs text-gray-400">Posted 25 mins ago</span>
            </div>
          </div>
        )}

        {/* Job Description */}
        {jobData && (
          <div className="bg-white rounded-xl p-8 md:p-12 shadow mb-8 space-y-8">
            {/* Job Description */}
            <div>
              <h2 className="text-2xl font-bold mb-4 capitalize">Job Description</h2>
              <div className="text-gray-700 leading-relaxed mb-2" dangerouslySetInnerHTML={{ __html: jobData.description }} />
            </div>
            {/* Key Responsibilities */}
            {jobData.responsibility && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Responsibilities</h2>
                <ul className="list-decimal ml-6 text-gray-700 space-y-2">
                  {jobData.responsibility.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {/* Skills Required */}
            {jobData.skills && (
              <div>
                <h2 className="text-2xl font-bold mb-4 capitalize">Skills Required</h2>
                <ul className="list-decimal ml-6 text-gray-700 space-y-2">
                  {jobData.skills.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sidebar */}
      <div className="w-full lg:w-1/4">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold text-lg mb-8">More jobs from {jobData?.company || "this company"}</h3>
          <div className="flex flex-col space-y-6">
            {moreJobs.length === 0 && (
              <div className="text-gray-400 text-sm">No more jobs from this company.</div>
            )}
            {moreJobs.map(job => (
              <div key={job._id} className="border rounded-lg p-4 flex flex-col gap-2">
                <div className="flex items-center gap-2 mb-2">
                  <img src={assets.company_icon} alt="" className="w-8 h-8" />
                  <div>
                    <div className="font-medium">{job.title}</div>
                    <div className="flex gap-2 mt-1">
                      <span className="bg-blue-50 border border-blue-200 px-2 py-0.5 rounded text-xs">{job.location}</span>
                      <span className="bg-red-50 border border-red-200 px-2 py-0.5 rounded text-xs">{job.level}</span>
                    </div>
                  </div>
                </div>
                <div className="text-gray-500 text-xs line-clamp-2 mb-2">{job.description.replace(/<[^>]+>/g, '').slice(0, 70)}...</div>
                <div className="flex gap-2 mt-2">
                  <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs">Apply now</button>
                  <button className="border border-gray-400 text-gray-600 px-3 py-1 rounded text-xs">Learn more</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApplyJob