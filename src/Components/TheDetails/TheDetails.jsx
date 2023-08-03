import axios from 'axios';
import { data } from 'jquery';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import noImage from '../Images/no_image.png'
import { Helmet } from 'react-helmet';

export default function TheDetails() {

    const apiKey = "5d1a8e296fc8303363b06b52c9e3cfcc";

    let { id, type } = useParams();

    const [responseAPI, setresponseAPI] = useState(null);
    const [isLoading, setisLoading] = useState(false)

    useEffect(() => {

        setisLoading(true);

        setTimeout(() => {

            switch (type) {
                case "movie":

                    getDetails("movie", id);

                    break;

                case "people":

                    getDetails("person", id);

                    break;

                case "tvshow":

                    getDetails("tv", id);

                    break;

                default:
                    break;
            }

        }, 500);

    }, []);



    let getDetails = async (category, id) => {

        let { data } = await axios.get(`https://api.themoviedb.org/3/${category}/${id}?api_key=${apiKey}&language=en-US`);

        setresponseAPI(data);

        setisLoading(false);

    }

    return (
        <>

            <div className="application">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Details</title>
                </Helmet>
            </div>
            {responseAPI != null ?

                <>

                    <div className='my-5'>
                        <div className='row g-3 my-4'>

                            <div className=' col-md-3'>

                                {responseAPI.poster_path != null ?

                                    <div>
                                        <img className='w-100 rounded' src={'https://image.tmdb.org/t/p/w500' + responseAPI.poster_path} alt="Image of poster" />
                                    </div>

                                    : responseAPI.profile_path != null ?

                                        <div>
                                            <img className='w-100 rounded' src={'https://image.tmdb.org/t/p/w500' + responseAPI.profile_path} alt="Image of poster" />
                                        </div>

                                        : <img src={noImage} className="w-100" alt="no_image" />}

                            </div>

                            <div className='col-md-9'>
                                <div>

                                    {responseAPI.original_title != null ?

                                        <h2>{responseAPI.original_title}</h2>

                                        : <h2>{responseAPI.name}</h2>}


                                    {responseAPI.overview != null ?
                                        <p className='text-muted h5'>{responseAPI.overview}</p>

                                        : responseAPI.biography != null ?
                                            <p className='text-muted h5'>{responseAPI.biography}</p>
                                            : ""}


                                    {responseAPI.genres != null ?
                                        responseAPI.genres.map((element, index) => <span key={index}><div className='badge fw-normal text-bg-success m-2 p-2'>{element.name}</div></span>)

                                        : responseAPI.also_known_as != null ?
                                            responseAPI.also_known_as.map((element, index) => <span key={index}><div className='badge fw-normal text-bg-success m-2 p-2'>{element}</div></span>)
                                            : ""}


                                    {responseAPI.vote_average != null ? <p className='h5 mt-3'>Vote: {responseAPI.vote_average.toFixed(1)}</p> : ""}

                                    {responseAPI.vote_count != null ? <p className='h5 py-2'>Vote count: {responseAPI.vote_count}</p> : ""}

                                    {responseAPI.popularity != null ? <p className='h5 py-2'>Popularity: {responseAPI.popularity}</p> : ""}

                                    {responseAPI.release_date != null ?
                                        <p className='h5 py-2'>Release date: {responseAPI.release_date}</p>

                                        : responseAPI.first_air_date != null ?
                                            <p className='h5 py-2'>First air date: {responseAPI.first_air_date}</p>

                                            :

                                            responseAPI.birthday != null ?
                                                <p className='h5 py-2'>Birthday: {responseAPI.birthday}</p>
                                                : ""

                                    }


                                    {responseAPI.overview != null ?

                                        <p className='h6 py-2 text-muted'>{responseAPI.overview}</p>
                                        :
                                        responseAPI.known_for_department != null ?

                                            <p className='h6 py-2 text-muted'>{responseAPI.known_for_department}</p>
                                            : ""}


                                </div>
                            </div>
                        </div >
                    </div >

                </>


                : <div className='loading'>
                    <div className="loader"></div>
                </div>
            }
        </>

    )
}


