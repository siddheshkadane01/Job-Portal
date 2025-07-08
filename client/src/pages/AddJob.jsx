import React, { useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import { JobCategories, JobLocations } from '../assets/assets';

const AddJob = () => {

    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    const [level, setLavel] = useState('');
    const [salary, setSalary] = useState('');

    const editorRef = useRef(null)
    const quillRef = useRef(null)

    useEffect(() => {
        //Initialization
        if(!quillRef.current && editorRef.current){
            quillRef.current = new Quill(editorRef.current, {
                theme: 'snow',
            })
        }
    }, [])

  return (
    <form className="bg-white rounded-xl shadow p-8 w-full max-w-xl mx-auto mt-10 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
            <p className="font-medium text-gray-700">Job Title</p>
            <input type="text" placeholder='Type here'
            onChange={e => setTitle(e.target.value)} value={title}
            required
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"/>
        </div>

        <div className="flex flex-col gap-2">
            <p className="font-medium text-gray-700">Job Description</p>
            <div ref={editorRef} style={{ minHeight: 120 }} className="border border-gray-300 rounded bg-white" />
        </div>

        <div className="flex flex-wrap gap-4">
            <div className="flex flex-col gap-2 flex-1 min-w-[150px]">
                <p className="font-medium text-gray-700">Job Category</p>
                <select onChange={e => setCategory(e.target.value)} className="border border-gray-300 rounded px-4 py-2 bg-white focus:outline-none">
                    <option value="">Select</option>
                    {JobCategories.map((category,index) => (
                         <option key={index} value={category}>{category}</option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-2 flex-1 min-w-[150px]">
                <p className="font-medium text-gray-700">Job Location</p>
                <select onChange={e => setLocation(e.target.value)} className="border border-gray-300 rounded px-4 py-2 bg-white focus:outline-none">
                    <option value="">Select</option>
                    {JobLocations.map((location,index) => (
                         <option key={index} value={location}>{location}</option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-2 flex-1 min-w-[150px]">
                <p className="font-medium text-gray-700">Job Level</p>
                <select onChange={e => setLavel(e.target.value)} className="border border-gray-300 rounded px-4 py-2 bg-white focus:outline-none">
                    <option value="">Select</option>
                    <option value="Beginner Level">Beginner Level</option>
                    <option value="Intermidiate Level">Intermidiate Level</option>
                    <option value="Advanced Level">Advanced Level</option>
                </select>
            </div>
        </div>

        <div className="flex flex-col gap-2 w-1/2 min-w-[150px]">
            <p className="font-medium text-gray-700">Salary</p>
            <input onChange={e => setSalary(e.target.value)} type="number" placeholder='0'
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"/>
        </div>

        <button type="submit" className="bg-black text-white rounded px-8 py-3 mt-4 font-semibold hover:bg-gray-900 transition-all w-40">ADD</button>
    </form>
  )
}

export default AddJob