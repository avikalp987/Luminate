import { Button } from 'flowbite-react'
import React from 'react'

export default function CallToAction() {
  return (
    <div className="flex-col flex sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
        <div className='flex-1 justify-center flex flex-col'>
            <h2 className='text-2xl'>
                Check my Github!
            </h2>
            <p className='text-gray-500 my-2'>
                Some of the amazing web development projects from youtube.
            </p>

            <Button gradientDuoTone={"purpleToPink"} className='rounded-tl-xl rounded-bl-none'>
                <a href='https://github.com/avikalp987' target='_blank' rel='noopener noreferrer'>
                    Let&apos;s Visit
                </a>
            </Button>
        </div>
        <div className="p-7 flex-1">
            <img src={"https://i.pinimg.com/474x/e7/96/a1/e796a1c4f2777caf462636e4f7dce241.jpg"} alt="cover_image" />
        </div>
    </div>
  )
}
