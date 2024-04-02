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
