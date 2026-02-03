/**
 * Cookie utility functions
 * Reference: https://www.w3schools.com/js/js_cookies.asp
 */

/**
 * Set a cookie with expiration time
 * @param name - Cookie name
 * @param value - Cookie value
 * @param hours - Hours until expiration
 */
export function setCookie(name: string, value: string, hours: number): void {
  const expireDate = new Date();
  expireDate.setTime(expireDate.getTime() + hours * 60 * 60 * 1000);
  const expires = 'expires=' + expireDate.toUTCString();
  document.cookie = name + '=' + value + ';' + expires + ';path=/';
}

/**
 * Get a cookie value by name
 * @param name - Cookie name
 * @returns Cookie value or empty string if not found
 */
export function getCookie(name: string): string {
  const namePattern = name + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieParts = decodedCookie.split(';');

  for (let i = 0; i < cookieParts.length; i++) {
    let cookie = cookieParts[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(namePattern) === 0) {
      return cookie.substring(namePattern.length, cookie.length);
    }
  }
  return '';
}
