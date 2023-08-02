import React, { useContext } from 'react'
import { AuthContext } from '../../Context/AuthStore';

export default function About() {

    const { user } = useContext(AuthContext);

    return (

        <>
            <div className=' text-center py-5'>
                <h2>Name: {user.first_name} {user.last_name}</h2>
                <h2>Age: {user.age}</h2>
                <h2>Email: {user.email}</h2>
            </div>
        </>
    )

}
