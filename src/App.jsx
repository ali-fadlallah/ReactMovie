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

function App() {

  const [user, setuser] = useState(null);

  useEffect(() => {

    if (localStorage.getItem("movie-db") != null) {

      saveUserData();

    }

  }, [])

  function saveUserData() {

    let token = localStorage.getItem("movie-db");

    let decode = jwtDecode(token);

    setuser(decode)

  }

  function ProtectedRoute(props) {

    if (localStorage.getItem("movie-db") == null) {

      return <Navigate to="/login" />

    } else {

      return props.children

    }
  }

  function logOut() {

    localStorage.removeItem("movie-db")
    setuser(null);
    return <Navigate to="/login" />

  }

  let Routers = createHashRouter([{

    path: "/", element: <MasterLayout UserData={user} logOut={logOut} />, children: [

      { path: "/", element: <ProtectedRoute> <Home /> </ProtectedRoute> },
      { path: "home", element: <ProtectedRoute> <Home /> </ProtectedRoute> },
      { path: "movies", element: <ProtectedRoute> <Movie /> </ProtectedRoute> },
      { path: "tvshow", element: <ProtectedRoute> <TVShow /> </ProtectedRoute> },
      { path: "people", element: <ProtectedRoute> <People /> </ProtectedRoute> },
      { path: "details/:id/:type", element: <ProtectedRoute> <TheDetails /> </ProtectedRoute> },
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
