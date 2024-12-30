import {useEffect, useState} from "react";

function UseFetchAPI(api,
                     {
                         method = 'GET',
                         headers = {
                             'Content-Type': 'application/json'
                         },
                         body = null,
                         credentials = 'include',
                         dependency=[]
                     }) {

    const API_URL = process.env.REACT_APP_API_URL;
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    // console.log(API_URL);

    useEffect(() => {
        // console.log('Increase counter');
        const options = {
            method,
            headers,
            credentials,
        };

        if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method.toUpperCase()) && body) {
            options.body = body;
        }
        fetch(`${API_URL}/${api}`, options)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setData(data)
            })
            .catch(error => {
                console.log(error);
                setError(error)
            })
            .finally(() => setLoading(false));
    }, [`${API_URL}/${api}`, ...dependency]);

    return {data, error, loading}
}

export default UseFetchAPI;