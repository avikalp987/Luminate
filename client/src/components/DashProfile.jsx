import { Alert, Button, TextInput } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from "react-redux"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { app } from "../firebase.js"


import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


export default function DashProfile() {

  const { currentUser } = useSelector((state) => state.user)
  const [imageFile, setImageFile] = useState(null)
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadingProgress, setImageFileUploadingProgresss] = useState(null)
  const [imageFileUploadError, setImageFileUploadError] = useState(null)


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
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL)
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

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>

        <form className='flex flex-col gap-4'>

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
