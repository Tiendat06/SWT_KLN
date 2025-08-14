import Cookies from "js-cookie";
import UseFetchAPI from "~/hooks/UseFetchAPI";

const accountRoute = 'api/account';

const saveTokens = (accessToken, refreshToken) => {
    if (typeof window !== 'undefined') {
        if (accessToken) {
            Cookies.set('access_token', accessToken, { expires: 0.05 });
        }
        if (refreshToken) {
            Cookies.set('refresh_token', refreshToken, { expires: 30 });
        }
    }
};

const clearTokens = () => {
    if (typeof window !== 'undefined') {
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
    }
};

const loginService = async (username, password) => {
    const formData = new FormData();
    formData.append('Username', username || '');
    formData.append('Password', password || '');

    const result = await UseFetchAPI({
        api: `${accountRoute}/login`,
        method: "POST",
        body: formData,
        headers: {}
    });

    const payload = result?.data ?? result ?? {};
    const accessToken = payload?.Token || payload?.token || '';
    const refreshToken = payload?.RefreshToken || payload?.refreshToken || '';
    
    if (accessToken) {
        saveTokens(accessToken, refreshToken);
    }
    
    return result;
};

const refreshTokenService = async (refreshToken) => {
    const formData = new FormData();
    formData.append('refreshTokenRequest', refreshToken || '');
    
    const result = await UseFetchAPI({
        api: `${accountRoute}/refresh`,
        method: 'POST',
        body: formData,
        headers: {},
        skipTokenRefresh: true
    });
    
    const payload = result?.data ?? result ?? {};
    const accessToken = payload?.Token || payload?.token || '';
    const newRefreshToken = payload?.RefreshToken || payload?.refreshToken || '';
    
    if (accessToken) {
        saveTokens(accessToken, newRefreshToken);
    }
    
    return result;
};

const logoutService = () => {
    clearTokens();
    if (typeof window !== 'undefined') {
        window.location.href = '/login';
    }
};

export const authService = {
    loginService,
    refreshTokenService,
    logoutService,
    saveTokens,
    clearTokens
};