import './App.css';
import { createBrowserRouter, createHashRouter, Navigate, RouterProvider } from 'react-router-dom';
import MasterLayout from './Components/MasterLayout/MasterLayout';
import Home from './Components/Home/Home';
import Movie from './Components/Movie/Movie';
import NotFound from './Components/NotFoundPage/NotFound';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import TVShow from './Components/TV/TVShow';
import People from './Components/People/People';
import jwtDecode from 'jwt-decode';
import { useState, useEffect } from 'react';
import TheDetails from './Components/TheDetails/TheDetails';
import About from './Components/About/About';
import ProtectedRouters from './Components/ProtectedRouters/ProtectedRouters';
import { useContext } from 'react';
import { AuthContext } from './Context/AuthStore';

function App() {

  const { saveUserData } = useContext(AuthContext);

  function ProtectedRoute(props) {

    if (localStorage.getItem("movie-db") == null) {

      return <Navigate to="/login" />

    } else {

      return props.children

    }
  }

  let Routers = createHashRouter([{

    path: "/", element: <MasterLayout />, children: [

      { path: "/", element: <ProtectedRouters> <Home /> </ProtectedRouters> },
      { path: "home", element: <ProtectedRouters> <Home /> </ProtectedRouters> },
      { path: "movies", element: <ProtectedRouters> <Movie /> </ProtectedRouters> },
      { path: "tvshow", element: <ProtectedRouters> <TVShow /> </ProtectedRouters> },
      { path: "people", element: <ProtectedRouters> <People /> </ProtectedRouters> },
      { path: "about", element: <ProtectedRouters> <About /> </ProtectedRouters> },
      { path: "details/:id/:type", element: <ProtectedRouters><TheDetails /></ProtectedRouters> },
      { path: "login", element: <Login saveUserData={saveUserData} /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <NotFound /> }

    ]
  }])

  return (
    <>
      <RouterProvider router={Routers}></RouterProvider>
    </>
  );
}

export default App;
