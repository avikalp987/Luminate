import { Alert, Button, TextInput } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from "react-redux"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { app } from "../firebase.js"
import { useDispatch } from 'react-redux'


import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { updateFailure, updateStart, updateSuccess } from '../redux/user/userSlice.js'

export default function DashProfile() {

  const { currentUser } = useSelector((state) => state.user)
  const [imageFile, setImageFile] = useState(null)
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadingProgress, setImageFileUploadingProgresss] = useState(null)
  const [imageFileUploadError, setImageFileUploadError] = useState(null)
  const [formdata, setFormdata] = useState({})
  const [imageFileUploading, setImageFileUploading] = useState(null)
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null)
  const [updateUserError, setUpdateUserError] = useState(null);

  const dispatch = useDispatch()
  const filePickerRef = useRef()

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(file)
    {
      setImageFile(file)
      setImageFileUrl(URL.createObjectURL(file))
    }
  }

  const uploadImage = async () => {

    setImageFileUploading(true)
    setImageFileUploadError(null)

    const storage = getStorage(app)
    const filename = new Date().getTime() + imageFile.name

    const storageRef = ref(storage, filename);

    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

        setImageFileUploadingProgresss(progress.toFixed(0))
      },
      (error) => {
        setImageFileUploadError("Could not upload image, File must be less than 2MB.")
        setImageFileUploadingProgresss(null)
        setImageFile(null)
        setImageFileUrl(null)
        setImageFileUploading(false)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL)
          setFormdata({...formdata, profilePicture: downloadURL})
          setImageFileUploading(false)

        })
      }
    )
  }

  useEffect(() => {
    if(imageFile)
    {
      uploadImage()
    }
  }, [imageFile])


  const handleChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUpdateUserError(null);
    setUpdateUserSuccess(null);

    if(Object.keys(formdata).length===0)
    {
      setUpdateUserError("No Changes made")
      return;
    }

    if(imageFileUploading)
    {
      setUpdateUserError("Please wait for image to upload")
      return;
    }

    try {
      
      dispatch(updateStart())

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata)
      })

      const data = await res.json()

      if(!res.ok)
      {
        dispatch(updateFailure(data.message))
        setUpdateUserError(data.message)
      }
      else
      {
        dispatch(updateSuccess(data))
        setUpdateUserSuccess("Profile Updated Successfully")

      }

    } catch (error) {
      
      dispatch(updateFailure(error.message))
      setUpdateUserError(error.message)
    }
  }


  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>

        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>

            <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden/>

            <div className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' onClick={() => filePickerRef.current.click()}>
            
              {imageFileUploadingProgress && (
                <CircularProgressbar 
                  value={imageFileUploadingProgress || 0} 
                  text={`${imageFileUploadingProgress}%`}
                  strokeWidth={5}
                  styles={{
                    root: {
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      top: 0,
                      left: 0,
                    },
                    path: {
                      stroke: `rgba(62, 152, 199, ${imageFileUploadingProgress / 100})`,
                    }
                  }}
                />  
              )}
              <img 
                src={imageFileUrl || currentUser.profilePicture} 
                alt='User Image' 
                className={`rounded-full w-full h-full border-8 border-[lightgray] object-cover ${imageFileUploadingProgress && imageFileUploadingProgress<100 && "opacity-60"}`}
              />

            </div>

            {imageFileUploadError && (
              <Alert color={"failure"}>
                {imageFileUploadError}
              </Alert>
            )}
            

            <TextInput 
              type='text' 
              id="username" 
              placeholder='Username' 
              defaultValue={currentUser.username}
              onChange={handleChange}              
            />

            <TextInput 
              type='email' 
              id="email" 
              placeholder='email@example.com' 
              defaultValue={currentUser.email}
              onChange={handleChange}
            />

            <TextInput 
              type='password' 
              id="password" 
              placeholder='Password'
              onChange={handleChange}
            />

            <Button  type='submit' gradientDuoTone={"purpleToBlue"} outline>
                Update
            </Button>
        </form>
        
        <div className="flex justify-between mt-5">
            <span className='text-rose-500 cursor-pointer'>Delete Account</span>
            <span className='text-rose-500 cursor-pointer'>Sign Out</span>
        </div>

        {updateUserSuccess && (
          <Alert color={"success"} className='mt-5'>
            {updateUserSuccess}
          </Alert>
        )}

        {updateUserError && (
          <Alert color={"failure"} className='mt-5'>
            {updateUserError}
          </Alert>
        )}

    </div>
  )
}
