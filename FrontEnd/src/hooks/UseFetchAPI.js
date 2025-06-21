import Cookies from "js-cookie";

async function UseFetchAPI(
    {
        api = '',
        method = 'GET',
        headers = {
            'Content-Type': 'application/json',
        },
        body = null,
        credentials = 'include',
        params = null,
    }) {

    const API_URL = process.env.REACT_APP_API_URL;
    const newHeaders = {
        ...headers,
        'Authorization': `Bearer ${Cookies.get("access_token") || ""}`
    };

    const options = {
        method,
        headers: newHeaders,
        credentials,
    };

    let queryString = '';
    if (method.toUpperCase() === 'GET' && params && typeof params === 'object') {
        const queryParams = new URLSearchParams(params).toString();
        queryString = `?${queryParams}`;
    }
    else if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method.toUpperCase()) && body) {
        options.body = body;
    }

    try {
        const response = await fetch(`${API_URL}/${api}${queryString}`, options)
        if (!response.ok) {

            let message = 'Có một lỗi nội bộ đã xảy ra trong quá trình thực hiện.'
            let status = response.status;
            const text = await response.text();
            if (text) {
                const responseJson = JSON.parse(text);
                if (responseJson?.message) message = responseJson.message;
                if (responseJson?.status) status = responseJson.status;
            }
            return {
                status,
                message
            }
        }
        return response.json();
    } catch (e) {
        // console.log(e.message);
        return {
            status: 500,
            message: 'Có một lỗi nội bộ đã xảy ra trong quá trình thực hiện.',
        }
    }
}

export default UseFetchAPI;