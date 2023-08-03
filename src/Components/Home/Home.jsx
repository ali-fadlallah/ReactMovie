import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import noImage from '../Images/no_image.png'
import { MediaContext } from '../../Context/MediaStore';
import { Helmet } from 'react-helmet';

export default function Home() {

  let { isLoading, movieData, tvData, peopleData } = useContext(MediaContext);

  return (
    <>

      <div className="application">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Home</title>
        </Helmet>
      </div>

      {isLoading == false ?

        <div>

          <div className='row g-3 my-4'>

            <div className='col-md-4 d-flex align-items-center'>

              <div className='w-100'>
                <div className='line w-50 my-3'></div>
                <h3>Trending<br />movies<br />to Watch now</h3>
                <p className=' text-muted'>most watched movies by days</p>
                <div className='line w-100 my-3'></div>

              </div>
            </div>




            {movieData.slice(0, 10).map((movie, index) => <div key={index} className='col-md-2'>


              <Link to={`/details/` + movie.id + `/movie`}>
                <div className='item position-relative'>

                  {movie.poster_path == null ? <img src={noImage} className="w-100" alt="no_image" /> : <img className=' rounded w-100' src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} alt="posterImage" />}

                  <h5 className=' text-center text-white'>{movie.title}</h5>

                  <div className='rounded bg-info position-absolute top-0 end-0 p-2'>{movie.vote_average?.toFixed(1)}</div>

                </div>

              </Link>

            </div>
            )}

          </div>

          <div className='row g-3 my-4'>

            <div className='col-md-4 d-flex align-items-center'>

              <div className='w-100'>
                <div className='line w-50 my-3'></div>
                <h3>Trending<br />TV<br />to Watch now</h3>
                <p className=' text-muted'>Most wanted TV by the days</p>
                <div className='line w-100 my-3'></div>

              </div>
            </div>




            {tvData.slice(0, 10).map((tv, index) => <div key={index} className='col-md-2'>

              <Link to={`/details/` + tv.id + `/tvshow`}>


                <div className='item position-relative'>

                  {tv.poster_path == null ? <img src={noImage} className="w-100" alt="no_image" /> : <img className=' rounded w-100' src={"https://image.tmdb.org/t/p/w500" + tv.poster_path} alt="posterImage" />}

                  <h5 className='text-center text-white'>{tv.name}</h5>

                  <div className='rounded bg-info position-absolute top-0 end-0 p-2'>{tv.vote_average?.toFixed(1)}</div>

                </div>

              </Link>
            </div>


            )}

          </div>

          <div className='row g-3 my-4'>

            <div className='col-md-4 d-flex align-items-center'>

              <div className='w-100'>
                <div className='line w-50 my-3'></div>
                <h3>Treding<br />People<br />to See Now</h3>
                <p className=' text-muted'>Most wanted People by the days</p>
                <div className='line w-100 my-3'></div>

              </div>
            </div>




            {peopleData.slice(0, 10).map((people, index) => <div key={index} className='col-md-2'>

              <Link to={`/details/` + people.id + `/people`}>

                <div className='item position-relative'>

                  {people.profile_path == null ? <img src={noImage} className="w-100 " alt="no_image" /> : <img className=' rounded w-100 ' src={"https://image.tmdb.org/t/p/w500" + people.profile_path} alt="posterImage" />}

                  <h5 className='text-center text-white'>{people.name}</h5>

                </div>
              </Link>
            </div>
            )}

          </div>

        </div>

        : <div className='loading'>
          <div className="loader"></div>
        </div>}
      <div>

      </div>

    </>
  )
}
