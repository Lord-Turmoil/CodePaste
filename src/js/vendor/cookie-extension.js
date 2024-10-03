// Reference: https://www.w3schools.com/js/js_cookies.asp

/**
 * Set a cookie.
 * @param {string} name name of the cookie
 * @param {string} value value of the cookie
 * @param {number} hours hours to expire
 */
function setCookie(name, value, hours) {
    const expireDate = new Date();
    expireDate.setTime(expireDate.getTime() + (hours * 60 * 60 * 1000));
    let expires = "expires=" + expireDate.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    name = name + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export { setCookie, getCookie };
