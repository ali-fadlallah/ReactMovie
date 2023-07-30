import React from 'react'
import { Navigate } from 'react-router-dom';

export default function ProtectedRouters({ user, children }) {

    if (user | localStorage.getItem('movie-db') == null) {

        return <Navigate to='/login' />

    } else {

        return children

    }

}
