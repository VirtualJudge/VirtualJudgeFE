import axios from 'axios';

axios.defaults.baseURL = '/api';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.xsrfCookieName = 'csrftoken';

export default {
    getUserInformation() {
        return ajax('/user/auth', 'get')
    },
    deleteUserInformation() {
        return ajax('/user/auth', 'delete')
    },
    postUserLogin(username, password) {
        return ajax('/user/auth', 'post', {
            data: {
                'username': username,
                'password': password
            }
        })
    }
}

/**
 * @param url
 * @param method get|post|put|delete...
 * @param options
 * @returns {Promise}
 */
function ajax(url, method, options) {
    if (options !== undefined) {
        var {params = {}, data = {}} = options
    } else {
        params = data = {}
    }
    return new Promise((resolve, reject) => {
        axios({
            url,
            method,
            params,
            data
        }).then(res => {
            if (res.data.status === 0) {
                resolve(res);
            } else {
                reject(res)
            }
        }, res => {
            reject(res)
        })
    })
}
