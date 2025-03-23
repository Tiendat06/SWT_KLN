import Cookies from "js-cookie";

async function UseFetchAPI(
                     {
                         api = '',
                         method = 'GET',
                         headers = {
                             'Content-Type': 'application/json',
                         },
                         body = null,
                         credentials = 'include'
                     }) {

    const API_URL = process.env.REACT_APP_API_URL;
    const newHeaders = {
        ...headers,
        'Authorization': `Bearer ${Cookies.get("access_token") || ""}`
    };

    const options = {
        method,
        newHeaders,
        credentials,
    };

    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method.toUpperCase()) && body) {
        options.body = body;
    }
    try{
        const response = await fetch(`${API_URL}/${api}`, options);
        if (response.status === 401) {
            return {
                status: 401,
                message: 'Authentication Failed !'
            }
        }
        return response.json();
    } catch (e) {
        return {
            status: 500,
            message: e.message,
        }
    }
}

export default UseFetchAPI;