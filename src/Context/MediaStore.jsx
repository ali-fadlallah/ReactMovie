import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let MediaContext = createContext(0);


export default function MediaContextProvider(props) {

    const apiKey = "5d1a8e296fc8303363b06b52c9e3cfcc";

    const [movieData, setmovieData] = useState([]);
    const [tvData, settvData] = useState([]);
    const [peopleData, setpeopleData] = useState([]);
    const [isLoading, setisLoading] = useState(false)

    let getData = async (category, callback) => {

        setisLoading(true);

        let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${category}/day?api_key=${apiKey}`);

        callback(data.results);

        setisLoading(false);

    }

    useEffect(() => {

        setisLoading(true)

        setTimeout(() => {

            getData("movie", setmovieData)
            getData("tv", settvData)
            getData("person", setpeopleData)

        }, 500);

    }, [])

    return <MediaContext.Provider value={{ movieData, tvData, peopleData, isLoading }}>

        {props.children}

    </MediaContext.Provider>
}

