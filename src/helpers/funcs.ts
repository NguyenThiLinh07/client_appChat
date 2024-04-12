import Cookies from 'js-cookie';

export const clearAllData = () => {
    // Clear cache and reload
    window.location.reload();

    // Clear local storage
    sessionStorage.clear();

    // Clear cookies
    const cookies = Object.keys(Cookies.get());
    cookies.forEach((cookie) => {
        Cookies.remove(cookie);
    });
};

export const debounce = (callback: Function, delay: number) => {
    let timeout: any;
    return (...args: any) => {
        console.log('...args:', args);
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            callback(...args);
        }, delay);
    };
}
