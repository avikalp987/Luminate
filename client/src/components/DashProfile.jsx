import { Button, TextInput } from 'flowbite-react'
import React from 'react'
import { useSelector } from "react-redux"

export default function DashProfile() {

  const { currentUser } = useSelector((state) => state.user)

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>

        <form className='flex flex-col gap-4'>
            <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>
            <img src={currentUser.profilePicture} alt='User Image' className='rounded-full w-full h-full border-8 border-[lightgray] object-cover'/>
            </div>

            <TextInput type='text' id="username" placeholder='Username' defaultValue={currentUser.username}/>

            <TextInput type='email' id="email" placeholder='email@example.com' defaultValue={currentUser.email}/>

            <TextInput type='password' id="password" placeholder='Password'/>

            <Button  type='submit' gradientDuoTone={"purpleToBlue"} outline>
                Update
            </Button>
        </form>
        
        <div className="flex justify-between mt-5">
            <span className='text-rose-500 cursor-pointer'>Delete Account</span>
            <span className='text-rose-500 cursor-pointer'>Sign Out</span>
        </div>

    </div>
  )
}
