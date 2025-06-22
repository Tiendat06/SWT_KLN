export const getLocalStorage = (item) => {
    return localStorage.getItem(item);
}

export const setLocalStorage = (item, value) => {
    localStorage.setItem(item, value);
}

export const getSessionStorage = (item) => {
    return sessionStorage.getItem(item);
}

export const setSessionStorage = (item, value) => {
    sessionStorage.setItem(item, value);
}