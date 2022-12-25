import React from 'react'
import { Link, NavLink } from 'react-router-dom'


export default function NavBar({ UserData, logOut }) {

    return (

        <>


            <nav className="navbar navbar-expand-lg bg-transparent navbar-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Movie-DB</Link>


                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        Menu
                        <span className="navbar-toggler-icon ms-2" />
                    </button>



                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        {UserData != null ?

                            <>
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <NavLink className={({ isActive }) => isActive ? "nav-link my-1 active" : "nav-link my-1"} aria-current="page" to="/">Home</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className={({ isActive }) => isActive ? "nav-link active my-1" : "nav-link my-1"} to="movies">Movies</NavLink>
                                    </li>

                                    <li className="nav-item">
                                        <NavLink className={({ isActive }) => isActive ? "nav-link active my-1" : "nav-link my-1"} to="tvshow">TV-Show</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className={({ isActive }) => isActive ? "nav-link active my-1" : "nav-link my-1"} to="people">Peoples</NavLink>
                                    </li>

                                    {/* <li className="nav-item">
                                        <NavLink userdata={UserData.first_name} className={({ isActive }) => isActive ? "nav-link active my-1" : "nav-link my-1"} to="about">About</NavLink>
                                    </li> */}
                                </ul>



                                <ul className="navbar-nav ma-auto mb-2 mb-lg-0">
                                    <li className="nav-item">

                                        <a className=' text-decoration-none text-white' target={"_blank"} href="https://www.facebook.com">
                                            <i className=' fa-brands fa-facebook mx-2'>
                                            </i>
                                        </a>

                                        <a className=' text-decoration-none text-white' target={"_blank"} href="https://www.instagram.com">
                                            <i className=' fa-brands fa-instagram mx-2'>
                                            </i>
                                        </a>

                                        <a className=' text-decoration-none text-white' target={"_blank"} href="https://www.twitter.com">
                                            <i className=' fa-brands fa-twitter mx-2'>
                                            </i>
                                        </a>

                                        <a className=' text-decoration-none text-white' target={"_blank"} href="https://www.youtube.com">
                                            <i className=' fa-brands fa-youtube mx-2'>
                                            </i>
                                        </a>
                                    </li>
                                </ul>

                                <h6>Welcome: {UserData.first_name} {UserData.last_name} </h6>

                                <button className='btn btn-outline-danger mx-3'><Link className=" text-decoration-none text-white" onClick={logOut}>Logout</Link>
                                </button>

                            </>

                            :

                            <div className='ms-auto'>


                                <button className='btn btn-outline-warning mx-3'><Link className="text-decoration-none text-white" to="login">Login</Link></button>


                                <button className='btn btn-outline-info'><Link className=" text-decoration-none text-white ms-auto" to="register">Register</Link></button>

                            </div>
                        }


                    </div>

                </div>
            </nav>
        </>
    )
}
