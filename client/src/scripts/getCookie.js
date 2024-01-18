import Cookies from 'js-cookie';

function getCookie(cookieName) {
    const cartCookieValue = Cookies.get(cookieName); 
    let parsedCart;
    
    try {
        parsedCart = cartCookieValue ? JSON.parse(cartCookieValue.slice(2)) : null;
    } catch (error) {
        // Handle the parsing error if needed
        parsedCart = cartCookieValue;
    }
    return parsedCart;
}

export default getCookie;