import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import noImage from '../Images/no_image.png'
import $ from "jquery";


export default function TVShow() {


  const apiKey = "5d1a8e296fc8303363b06b52c9e3cfcc";

  const [responseAPI, setresponseAPI] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [choosedCategory, setchoosedCategory] = useState("popular")

  let pages = new Array(10).fill(1).map((element, i) => i + 1);

  useEffect(() => {

    setIsLoading(true);

    setTimeout(() => {

      getData(choosedCategory, 1);

    }, 500);


  }, [])


  function changePage(pageNo) {

    setIsLoading(true)

    setTimeout(() => {

      getData(choosedCategory, pageNo);

    }, 500);

  }


  function changeCategory(eventInfo) {

    setchoosedCategory(eventInfo.target.id);

    setIsLoading(true)

    setTimeout(() => {

      getData(eventInfo.target.id, 1);

    }, 500);

  }

  async function searchWords(eventInfo) {

    if (eventInfo.target.value == "") {

      getData(choosedCategory, 1);

      $(".pagination").removeClass("d-none").addClass("d-flex");

    } else {

      let { data } = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&language=en-US&query=${eventInfo.target.value}&page=1&include_adult=false`);

      setresponseAPI(data.results);

      $(".pagination").removeClass("d-flex").addClass("d-none");

    }

  }

  async function getData(category, pageNo) {

    let { data } = await axios.get(`https://api.themoviedb.org/3/tv/${category}?api_key=${apiKey}&language=en-US&page=${pageNo}`);

    setresponseAPI(data.results);

    setIsLoading(false);

  }

  return (
    <>
      {isLoading != true ?

        <>

          {responseAPI != null ?


            <div>

              <ul className="d-flex justify-content-center my-4 list-unstyled">
                <li>
                  <NavLink className="nav-linkCategory" id="now_playing" onClick={changeCategory} >Now Playing</NavLink>
                </li>
                <li>
                  <NavLink className="nav-linkCategory" id="popular" onClick={changeCategory} >Popular</NavLink>
                </li>
                <li>
                  <NavLink className="nav-linkCategory" id="top_rated" onClick={changeCategory} >Top Rated</NavLink>
                </li>
                <li>
                  <NavLink className="nav-linkCategory" id="upcoming" onClick={changeCategory} >Upcoming</NavLink>
                </li>
              </ul>


              <input onChange={searchWords} className=" form-control w-50 m-auto bg-transparent text-white text-center" type="search" placeholder="Search..." />


              <div className='row g-3 my-4 text-center'>

                {responseAPI.map((element, index) =>

                  <div key={index} className=' col-md-2'>
                    <Link to={"/details/" + element.id + "/tvshow"}>
                      <div className=' position-relative'>

                        {element.poster_path == null ? <img src={noImage} className="w-100" alt="no_image" /> : <img className=' rounded w-100' src={"https://image.tmdb.org/t/p/w500" + element.poster_path} alt="posterImage" />}

                        <h5 >{element.name}</h5>

                        <div className='rounded bg-info position-absolute top-0 end-0 p-2'>{element.vote_average.toFixed(1)}</div>

                      </div>
                    </Link>
                  </div>

                )}
              </div>

              <div >

                <ul className="pagination pagination-lg d-flex justify-content-center">

                  {pages.map((page, index) => <li key={index} className="page-item "><a onClick={() => changePage(page)} key={index} className="page-link ">{page}</a></li>
                  )}

                </ul>

              </div>

            </div>

            : <div className='loading'>
              <div className="loader"></div>

            </div>
          }

        </> : <div className='loading'>
          <div className="loader"></div>

        </div>}


    </>
  )

}
