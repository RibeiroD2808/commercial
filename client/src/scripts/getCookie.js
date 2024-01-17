import Cookies from 'js-cookie';

function getCookie(cookieName) {

    const cartCookieValue = Cookies.get(cookieName) ? Cookies.get(cookieName).slice(2) : null;
    const parsedCart = JSON.parse(cartCookieValue);

    return parsedCart;
}

export default getCookie;