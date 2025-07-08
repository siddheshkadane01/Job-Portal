import React from 'react'
import { manageJobsData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const ManageJobs = () => {

    const navigate = useNavigate()

  return (
    <div className="w-full max-w-5xl mx-auto mt-10">
      <div className="bg-white rounded-xl shadow p-6">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="font-bold py-3 px-4">#</th>
              <th className="font-bold py-3 px-4">Job Title</th>
              <th className="font-bold py-3 px-4">Date</th>
              <th className="font-bold py-3 px-4">Location</th>
              <th className="font-bold py-3 px-4">Applicants</th>
              <th className="font-bold py-3 px-4">Visible</th>
            </tr>
          </thead>
          <tbody>
            {manageJobsData.map((job, index) => (
              <tr key={index} className="border-b last:border-b-0">
                <td className="py-3 px-4 font-normal text-gray-800">{index + 1}</td>
                <td className="py-3 px-4 font-normal text-gray-800">{job.title}</td>
                <td className="py-3 px-4 font-normal text-gray-800">{job.date}</td>
                <td className="py-3 px-4 font-normal text-gray-800">{job.location}</td>
                <td className="py-3 px-4 font-normal text-gray-800">{job.applicants}</td>
                <td className="py-3 px-4 font-normal text-gray-800">
                  <input type="checkbox" checked={job.visible} readOnly className="accent-blue-500 w-5 h-5 cursor-default" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end mt-8">
          <button onClick={() => navigate('/dashboard/add-job')} className="bg-black text-white rounded px-8 py-3 font-semibold hover:bg-gray-900 transition-all">Add new job</button>
        </div>
      </div>
    </div>
  )
}

export default ManageJobs