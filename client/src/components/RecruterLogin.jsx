import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const RecruterLogin = () => {

    const [state, setState] = useState('login')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [image, setImage] = useState(false)

    const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false)

    const {setShowRecruterLogin} = useContext(AppContext)

    const onSubmitHandler = (e) => {
      e.preventDefault()
      if (state === "signup" && !isTextDataSubmitted) {
        setIsTextDataSubmitted(true)
      }
    }

    useEffect(() => {
      document.body.style.overflow = 'hidden'
      return () => 
        document.body.style.overflow = 'unset'
    })

  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
        <form onSubmit={onSubmitHandler} className='relative bg-white p-10 rounded-xl text-slate-500'>
          <h1 className='text-center text-2xl font-medium text-neutral-700'>Recruiter {state}</h1>
          <p className='text-sm'>Welcome. Please sign in to continue</p>


        {state === "signup" && isTextDataSubmitted
          ? <>
          <div className='flex items-center gap-4 my-10'>
            <label className="cursor-pointer">
              <img
                className='w-10 rounded-full'
                src={image ? image : assets.upload_area}
                alt=""
              />
              <input
                type="file"
                hidden
                onChange={e => {
                  if (e.target.files && e.target.files[0]) {
                    setImage(URL.createObjectURL(e.target.files[0]));
                  }
                }}
              />
              <p>Upload Company <br /> Logo</p>
            </label>
          </div>
          </>
        : <>
        {state !== 'login' && (
          <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
          <img src={assets.person_icon} alt="" />
          <input className='outline-none' onChange={e => setName(e.target.value)} value={name} type="text" placeholder='company name' required />
        </div>
        )}

        

        <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
          <img src={assets.email_icon} alt="" />
          <input className='outline-none' onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder='Email Id' required />
        </div>

        <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
          <img src={assets.lock_icon} alt="" />
          <input className='outline-none' onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder='Password' required />
        </div>

        
        </>}
        {state === "login" && <p className='text-sm text-blue-500 mt-4 cursor-pointer'>Forgot Password</p>}
          

          <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-full mt-5 w-full'>
            {state === 'login' ? 'Login' : isTextDataSubmitted ? 'Create Account' : 'next'}
          </button>

          {
            state === 'login'
            ?
            <p>Don't have an account? <span onClick={() => setState('signup')} className='text-blue-500 cursor-pointer'>Sign up</span></p>
            :
            <p>Already have an account? <span onClick={() => setState('login')} className='text-blue-500 cursor-pointer'>Login</span></p>
          }

          <img onClick={e => setShowRecruterLogin(false)} className='absolute top-5 right-5 cursor-pointer' src={assets.cross_icon} alt="" />

        </form>
    </div>
  )
}

export default RecruterLogin