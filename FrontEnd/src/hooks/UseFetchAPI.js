import Cookies from "js-cookie";
import { authService } from "~/services/LoginService";  // Import tĩnh để fix phần 5

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
        skipTokenRefresh = false,
    }) {

    const API_URL = process.env.REACT_APP_API_URL;
    const accessToken = Cookies.get("access_token") || "";
    const newHeaders = {
        ...headers,
        'Authorization': accessToken ? `Bearer ${accessToken}` : undefined
    };

    // Remove undefined headers
    Object.keys(newHeaders).forEach(key => {
        if (newHeaders[key] === undefined) {
            delete newHeaders[key];
        }
    });

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
        let response = await fetch(`${API_URL}/${api}${queryString}`, options);
        
        // Nếu token hết hạn (401) và không phải là request refresh token
        if (response.status === 401 && !skipTokenRefresh && !api.includes('login') && !api.includes('refresh')) {
            const refreshToken = Cookies.get("refresh_token");
            
            if (refreshToken) {
                try {
                    const refreshResult = await authService.refreshTokenService(refreshToken);
                    
                    // Nếu refresh thành công, thử lại request ban đầu
                    if (refreshResult?.data?.Token || refreshResult?.Token) {
                        const newAccessToken = Cookies.get("access_token");
                        const updatedHeaders = {
                            ...newHeaders,
                            'Authorization': `Bearer ${newAccessToken}`
                        };
                        
                        const retryOptions = {
                            ...options,
                            headers: updatedHeaders
                        };
                        
                        const retryResponse = await fetch(`${API_URL}/${api}${queryString}`, retryOptions);
                        
                        response = retryResponse;
                    }
                } catch (refreshError) {
                    console.error('Token refresh failed:', refreshError);
                    // Xóa tokens và redirect về login
                    Cookies.remove('access_token');
                    Cookies.remove('refresh_token');
                    if (typeof window !== 'undefined') {
                        window.location.href = '/login';
                    }
                }
            } else {
                if (typeof window !== 'undefined') {
                    window.location.href = '/login';
                }
            }
        }
        
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