import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CircularProgressbar } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { useNavigate, useParams } from "react-router-dom"

import { app } from "../firebase"
import { useSelector } from 'react-redux';


export default function UpdatePost() {

  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formdata, setFormdata] = useState({
    content: "",
  })
  const [publishError, setPublishError] = useState(null);

  const { postId } = useParams()
  const navigate = useNavigate();

  const { currentUser } = useSelector(state => state.user)

  console.log(formdata)

  useEffect(() => {
    try {
        const fetchPost = async () => {
            const res = await fetch(`/api/post/getposts?postId=${postId}`);
            const data = await res.json();

            if(!res.ok)
            {
                console.log(data.message)
                setPublishError(data.message)
                return;
            }
            if(res.ok)
            {
                setPublishError(null)
                setFormdata(data.posts[0])
            }
        } 
        fetchPost();
    } catch (error) {
        console.log(error)
    }
  }, [postId])


  const handleUploadImage = async () => {

    try {
        
        if(!file)
        {
            setImageUploadError("Please select an image")
            return;
        }

        setImageUploadError(null);

        const storage = getStorage(app)
        const filename = new Date().getTime() + "-" + file.name

        const storageRef = ref(storage, filename)

        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                setImageUploadProgress(progress.toFixed(0))
            },
            (error) => {
                setImageUploadError("Soething went wrong");
                setImageUploadProgress(null);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageUploadProgress(null)
                    setImageUploadError(null);
                    setFormdata({...formdata, image: downloadURL})
                })
            }
        )

    } catch (error) {
        setImageUploadError("Image upload failed")
        setImageUploadProgress(null);
        console.log(error)
    }

  }


  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
        
        const res = await fetch(`/api/post/updatepost/${postId}/${currentUser._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formdata),
        })

        const data = await res.json()

        if(!res.ok)
        {
            setPublishError(data.message)
            return;
        }

        if(res.ok)
        {
            setPublishError(null);
            navigate(`/post/${data.slug}`)
        }

    } catch (error) {
        setPublishError("Something went wrong")
    }
  }

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className='text-center text-3xl my-7 font-semibold'>Update post</h1>

        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                <TextInput 
                    type='text' 
                    placeholder='title' 
                    required  
                    className='flex-1'
                    onChange={(e) => setFormdata({...formdata, title: e.target.value})}
                    value={formdata.title}
                />
                <Select
                    onChange={(e) => setFormdata({...formdata, category: e.target.value})}
                    value={formdata.category}
                    
                >
                    <option value="uncategorized">Select a category</option>
                    <option value="typescript">Typescript</option>
                    <option value="javascript">Javascript</option>
                    <option value="nextjs">NextJS</option>
                    <option value="reactjs">ReactJS</option>
                </Select>
            </div>

            <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
                <FileInput 
                    type="file" 
                    accept='image/*' 
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <Button 
                    type="button" 
                    gradientDuoTone={"purpleToBlue"} 
                    size={"sm"} 
                    outline 
                    onClick={handleUploadImage}
                    disabled={imageUploadProgress}
                >
                    {
                        imageUploadProgress ? (
                            <div className="w-16 h-16">
                                <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`} />
                            </div>
                        ) : (
                            "Upload Image"
                        )
                    }
                </Button>
            </div>

            {imageUploadError && (
                <Alert color={"failure"}>
                    {imageUploadError}
                </Alert>
            )}

            {formdata.image && (
                <img 
                    src={formdata.image}
                    alt='"upload'
                    className='w-full h-72 object-cover'
                />
            )}

        <ReactQuill
          theme='snow'
          placeholder='Write something...'
          className='h-72 mb-12'
          required
          value={formdata.content}
          onChange={(value) => {
            setFormdata({ ...formdata, content: value });
          }}
        />

            <Button type='submit' gradientDuoTone={"purpleToPink"}>Update Post</Button>

            {publishError && (
                <Alert color={"failure"} className='mt-5'>
                    {publishError}
                </Alert>
            )}
        </form>
    </div>
  )
}
