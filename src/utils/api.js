import axios from 'axios';

axios.defaults.baseURL = '/api';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.xsrfCookieName = 'csrftoken';

export default {
    getUserInformation() {
        return ajax('/user/info/', 'get')
    },
    deleteUserInformation() {
        return ajax('/user/logout/', 'delete')
    },
    postUserLogin(username, password, captcha) {
        return ajax('/user/login/', 'post', {
            data: {
                'username': username,
                'password': password,
                'captcha': captcha
            }
        })
    },
    putUserRegister(username, password, email, captcha) {
        return ajax('/user/register/', 'put', {
            data: {
                'username': username,
                'password': password,
                'captcha': captcha,
                'email': email
            }
        })
    },
    postAccountActivate(id, code) {
        return ajax('/user/activate/', 'post', {
            data: {
                'id': id,
                'code': code
            }
        })
    },
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
