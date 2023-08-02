import React from 'react'
import { Outlet } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';

export default function MasterLayout() {
    return (
        <>
            <NavBar />

            <div className=' container'>
                <Outlet />
            </div>

        </>
    )
}
