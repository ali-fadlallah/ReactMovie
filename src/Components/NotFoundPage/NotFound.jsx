import React from 'react'
import notFound from '../Images/notfound.png'
import { Helmet } from 'react-helmet'

export default function NotFound() {
  return (

    <>

      <div className="application">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Not Found Pages</title>
        </Helmet>
      </div>
      <div className='text-center py-5 my-3'>

        <h6 className='h1'>This Page Is Not Found</h6>

        <img className='w-50' src={notFound} alt="not found Image" />

      </div>
    </>
  )
}
