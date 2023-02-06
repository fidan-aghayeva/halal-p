import Renderer from 'utils/Renderer';

export const COOKIE_KEYS = {
    language: 'language',
};

class Cookie {
    static keysToRemove = [];

    static setCookieAttribute = (key, value) => {
        if (!value) return '';

        return `;${key}=${value}`;
    };

    static getCookies() {
        const cookies = document.cookie.split(';').filter(v => v);

        return cookies.reduce((res, cookie) => {
            const [key, value] = cookie.trim().split('=');

            return { ...res, [key]: value };
        }, {});
    }

    static setItem(key, value, options = {}) {
        const cookies = Cookie.getCookies();

        const { expires, maxAge = 100 * 365 * 24 * 60 * 60, path = '/' } = options;

        cookies[key] =
            value +
            Cookie.setCookieAttribute('max-age', maxAge) +
            Cookie.setCookieAttribute('path', path) +
            Cookie.setCookieAttribute('expires', expires);

        document.cookie = key + '=' + cookies[key];
    }

    static getItem(givenKey, cookies) {
        if (Renderer.onClientSide()) {
            cookies = Cookie.getCookies();
        }

        return cookies[givenKey];
    }

    static deleteItem(key) {
        Cookie.setItem(key, '');
    }

    static clear() {
        Cookie.keysToRemove.forEach(key => {
            Cookie.setItem(key, '');
        });
    }
}

export default Cookie;
