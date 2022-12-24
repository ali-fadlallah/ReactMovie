import React from 'react'
import { Outlet } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';

export default function MasterLayout({ UserData, logOut }) {
    return (
        <>
            <NavBar UserData={UserData} logOut={logOut} />

            <div className=' container'>
                <Outlet />
            </div>

        </>
    )
}
