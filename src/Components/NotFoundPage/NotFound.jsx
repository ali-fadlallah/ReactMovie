import React from 'react'
import notFound from '../Images/notfound.png'

export default function NotFound() {
  return (

    <>
      <div className='text-center py-5 my-3'>

        <h6 className='h1'>This Page Is Not Found</h6>

        <img className='w-50' src={notFound} alt="not found Image" />

      </div>
    </>
  )
}
