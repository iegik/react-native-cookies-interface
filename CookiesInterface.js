import { Platform } from 'react-native';
import { serialize, parse } from 'cookie';
import { reduce, map, forEach, filter } from 'lodash';

export function callback(err, res) {
    return res;
}

export default class {
    /**
     * @typedef cookie
     * @type {object}
     * @property {string} domain
     * @property {string} path
     * @property {string} name
     * @property {string} value
     * @property {string} origin 'same origin'
     * @property {number} version 1
     * @property {date} expiration ISODateString
     *
     * @param HOST
     * @param DOMAIN
     *
     * @return {object} interface for Cookie manager
     */
    constructor (HOST, DOMAIN) {
        if (Platform.OS === 'ios') {
            let CM = require('react-native-cookies');

            /**
             * class CookieManager {
             *      set({object}, {function({error} err, {object} res)})
             *      setFromResponse({string} HOST, {string}, {function({object} res)}) +
             *
             *      get({string} HOST, {function({error} err, {string} res)}) +
             *      getAll({object}, {function({error} err, {object} res)}) iOS only
             *
             *      clearAll({function({error} err, {object} res)}) +
             *      clearByName({string}, {function({error} err, {object} res)}) iOS only
             * }
             */

            return {
                /**
                 * Clears all cookies
                 * @param cb Callback
                 * @returns {*}
                 */
                clearCookies(cb = callback){
                    return CM.clearAll(cb);
                },
                /**
                 * Get {cookie} and passes to Callback
                 * @param cb Callback
                 * @returns {*}
                 */
                getCookie(cb = callback){
                    return CM.get(HOST, (err, res) => {
                        return cb(err, res)
                    })
                },
                /**
                 * Set {cookie}
                 * @param {cookie} options
                 * @param cb Callback
                 * @returns {*}
                 */
                setCookie(options, cb = callback){
                    options = {
                        "Set-Cookie": map(options, (value, key) => serialize(key, value)).join(';')
                    };
                    return CM.setFromResponse(HOST, options, cb)
                },
            };

        } else {
            let CM = require('react-native-cookiemanager').default;

            /**
             * class CookieManager {
             *      setCookie({object} options) +
             *
             *      getCookie({string} HOST, {function({object} res)}) +
             *
             *      removeAllCookies() +
             * }
             */

            return {
                /**
                 * Clears all cookies
                 * @param cb Callback
                 * @returns {*}
                 */
                clearCookies(cb = callback){
                    CM.removeAllCookies();
                    return cb();
                },
                /**
                 * Get {cookie} and passes to Callback
                 * @param cb Callback
                 * @returns {*}
                 */
                getCookie(cb = callback){
                    return CM.getCookie(DOMAIN, (res) => {
                        let parsed = parse(res || '');

                        return cb(null, parsed);
                    });
                },
                /**
                 * Set {cookie}
                 * @param {cookie} options
                 * @param cb Callback
                 * @returns {*}
                 */
                setCookie(options, cb = callback) {
                    let {expiration = '', domain = DOMAIN, path = '', origin = ''} = options;
                    forEach(options, (value, name) => {
                        if (['expiration', 'domain', 'path'].indexOf(name) > -1) {
                            return;
                        }
                        return CM.setCookie({
                            name, value: encodeURIComponent(value),
                            expiration, domain, path, origin
                        })
                    });
                    return cb();
                },
            }
        }
    }
}
