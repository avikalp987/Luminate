import React from 'react'
import CallToAction from "../components/CallToAction"

export default function Projects() {
  return (
    <div className='min-h-screen max-w-2xl mx-auto flex items-center justify-center flex-col gap-6 p-3'>
      <h1 className='text-3xl font-semibold'>Projects</h1>
      <p className='text-md text-gray-500'>Visit my github for amazing web development projects from youtube!</p>
      <CallToAction />
    </div>
  )
}
