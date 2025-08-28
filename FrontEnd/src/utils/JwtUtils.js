export const decodeJWT = (token) => {
    try {
        if (!token) {
            return null;
        }

        const parts = token.split('.');
        if (parts.length !== 3) {
            console.error('Invalid JWT token format');
            return null;
        }

        const payload = parts[1];
        
        const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
        const padded = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, '=');
        const decoded = atob(padded);
        
        return JSON.parse(decoded);
    } catch (error) {
        console.error('Error decoding JWT:', error);
        return null;
    }
};

export const getUserRoleFromToken = (token) => {
    const payload = decodeJWT(token);
    if (!payload) {
        return null;
    }

    return payload.role || 
           payload.Role || 
           payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ||
           payload['role'] ||
           null;
};

export const isTokenExpired = (token) => {
    const payload = decodeJWT(token);
    if (!payload || !payload.exp) {
        return true;
    }

    return Date.now() >= payload.exp * 1000;
};

export const getUserInfoFromToken = (token) => {
    const payload = decodeJWT(token);
    if (!payload) {
        return null;
    }

    return {
        username: payload.sub || payload.username || payload.Username || payload.name,
        role: getUserRoleFromToken(token),
        email: payload.email || payload.Email,
        exp: payload.exp,
        iat: payload.iat
    };
};
