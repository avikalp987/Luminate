import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function SignUp() {

  const [formData, setFormData] = useState({})
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim()
    })
  }


  const handleSumbit = async (e) => {
    e.preventDefault()


    if(!formData.username || !formData.email || !formData.password)
    {
      return setErrorMessage("Please fill all the fields.")
    }

    try {

      setLoading(true)
      setErrorMessage(null);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })


      const data = await res.json()
      if(data.success === false)
      {
        setLoading(false)
        return setErrorMessage(data.message)
      }

      setLoading(false)

      if(res.ok)
      {
        navigate("/sign-in")
      }

      
    } catch (error) {
      setErrorMessage(error.message)

      setLoading(false)
    }
  }

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
        <form className='flex flex-col gap-4' onSubmit={handleSumbit}>
          <div>
            <Label value='Username'/>
            <TextInput 
              type='text'
              placeholder='username (must be unique)'
              id='username'
              onChange={handleChange}
            />
          </div>

          <div>
            <Label value='Email'/>
            <TextInput 
              type='email'
              placeholder='email@example.com'
              id='email'
              onChange={handleChange}
            />
          </div>

          <div>
            <Label value='Password'/>
            <TextInput 
              type='password'
              placeholder='password'
              id='password'
              onChange={handleChange}
            />
          </div>

          <Button
            gradientDuoTone={"purpleToPink"}
            type='submit'
            disabled={loading}
          >
            {
              loading ? (
                <>
                <Spinner size={"sm"}/>
                <span className='pl-3'>Loading...</span>
                </>
              ) : "Sign Up"
            }
          </Button>
        </form>

        <div className='flex gap-2 text-sm mt-5'>
          <span>Have an account?</span>
          <Link to={"/sign-in"} className='text-blue-500'>Sign In</Link>
        </div>

        {errorMessage && (
          <Alert className='mt-5' color={"failure"}>
            {errorMessage}
          </Alert>
        )}

      </div>

      </div>
    </div>
  )
}
