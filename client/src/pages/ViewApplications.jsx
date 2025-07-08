import React from 'react'
import { assets, viewApplicationsPageData } from '../assets/assets'

const ViewApplications = () => {
  return (
    <div className="bg-white rounded-xl shadow p-6 mt-8 w-full max-w-5xl mx-auto">
      <div>
          <table className="w-full text-left border-separate border-spacing-y-2">
              <thead>
                  <tr>
                      <th className="font-bold py-3 px-4">#</th>
                      <th className="font-bold py-3 px-4">User name</th>
                      <th className="font-bold py-3 px-4">Job Title</th>
                      <th className="font-bold py-3 px-4">Location</th>
                      <th className="font-bold py-3 px-4">Resume</th>
                      <th className="font-bold py-3 px-4">Action</th>
                  </tr>
              </thead>
              <tbody>
                  {viewApplicationsPageData.map((applicant, index) => (
                    <tr key={index} className="border-b last:border-b-0">
                      <td className="py-3 px-4 font-normal text-gray-800">{index + 1}</td>
                      <td className="py-3 px-4 font-normal text-gray-800">
                        <img src={applicant.imgSrc} alt="" className="w-10 h-10 rounded-full object-cover inline-block mr-2" />
                        <span>{applicant.name}</span>
                      </td>
                      <td className="py-3 px-4 font-normal text-gray-800">{applicant.jobTitle}</td>
                      <td className="py-3 px-4 font-normal text-gray-800">{applicant.location}</td>
                      <td className="py-3 px-4 font-normal text-gray-800">
                        <a
                          href={applicant.resumeUrl}
                          className="text-blue-400 flex items-center gap-1 hover:underline"
                          download
                        >
                          Resume
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" /></svg>
                        </a>
                      </td>
                      <td className="relative py-3 px-4 font-normal text-gray-800">
                        <div className="group inline-block">
                          <button className="text-2xl px-2 py-1 rounded hover:bg-gray-100">...</button>
                          <div className="absolute right-0 mt-2 w-28 bg-white rounded shadow-lg border z-10 hidden group-hover:block">
                            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-blue-500">Accept</button>
                            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500">Reject</button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
          </table>
      </div>
    </div>
  )
}

export default ViewApplications