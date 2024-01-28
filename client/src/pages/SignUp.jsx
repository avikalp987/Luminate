import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
      
      {/* left side */}
      <div className='flex-1'>
        <Link
          to={"/"}
          className='whitespace-nowrap text-4xl sm:text-xl font-bold dark:text-white'
        >
          <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Luminate</span>
          Blog
        </Link>

        <p className='text-sm mt-5'>
          This is a demo and experimental site. You can sign up with your email and password or with Google.
        </p>
      </div>


      {/* right side */}
      <div className='flex-1'>
        <form className='flex flex-col gap-4'>
          <div>
            <Label value='Username'/>
            <TextInput 
              type='text'
              placeholder='username (must be unique)'
              id='username'
            />
          </div>

          <div>
            <Label value='Email'/>
            <TextInput 
              type='email'
              placeholder='email@example.com'
              id='email'
            />
          </div>

          <div>
            <Label value='Password'/>
            <TextInput 
              type='password'
              placeholder='password'
              id='password'
            />
          </div>

          <Button
            gradientDuoTone={"purpleToPink"}
            type='submit'
          >
            Sign Up
          </Button>
        </form>

        <div className='flex gap-2 text-sm mt-5'>
          <span>Have an account?</span>
          <Link to={"/sign-in"} className='text-blue-500'>Sign In</Link>
        </div>
      </div>

      </div>
    </div>
  )
}
