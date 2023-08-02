import jwtDecode from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export let AuthContext = createContext(null);


export default function AuthContextProvider(props) {

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

    function logOut() {

        localStorage.removeItem("movie-db");
        setuser(null);
        return <Navigate to="/login" />

    }

    return <AuthContext.Provider value={{ user, saveUserData, logOut }}>

        {props.children}
    </AuthContext.Provider>
}