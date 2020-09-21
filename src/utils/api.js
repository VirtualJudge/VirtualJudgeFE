import axios from 'axios';

axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.xsrfCookieName = 'csrftoken';

export default {
    getSelfInformation() {
        return ajax('/api/user/info/', 'get')
    },
    deleteSelfInformation() {
        return ajax('/api/user/logout/', 'delete')
    },
    getSelfActivities(user_id) {
        return ajax(`/api/user/${user_id}/activities/`, 'get')
    },
    getUserInformation(user_id) {
        return ajax(`/api/user/${user_id}/`, 'get')
    },
    getUserRank(params) {
        let url_params = params || {}
        return ajax('/api/user/', 'get', {
            params: url_params
        })
    },
    getUserFollowingRank(params) {
        let url_params = params || {}
        return ajax('/api/user/following/', 'get', {
            params: url_params
        })
    },
    getUserIsFollowed(user_id) {
        return ajax(`/api/user/${user_id}/followed/`, 'get')
    },
    postChangeFollowing(user_id, follow) {
        return ajax('/api/user/following/', 'post', {
            data: {
                'user_id': user_id,
                'follow': follow
            }
        })
    },
    postUserLogin(username, password, captcha) {
        return ajax('/api/user/login/', 'post', {
            data: {
                'username': username,
                'password': password,
                'captcha': captcha
            }
        })
    },
    postEmailValidate(email, captcha) {
        return ajax('/api/user/check_email/', 'post', {
            data: {
                'email': email,
                'captcha': captcha
            }
        })
    },
    putUserRegister(username, password, email, verify_code) {
        return ajax('/api/user/register/', 'put', {
            data: {
                'username': username,
                'password': password,
                'verify_code': verify_code,
                'email': email
            }
        })
    },
    getProblemList(params) {
        let url_params = params || {}
        return ajax('/api/problem/', 'get', {
            params: url_params
        })
    },
    getProblemDetail(id) {
        return ajax(`/api/problem/${id}/`, 'get')
    },
    getAdvancedProblemDetail(id) {
        return ajax(`/api/problem/${id}/system_retrieve/`, 'get')
    },
    postProblemCreate(title, content, source, time_limit, memory_limit, is_public, manifest) {
        return ajax('/api/problem/', 'post', {
            data: {
                'title': title,
                'content': content,
                'source': source,
                'time_limit': time_limit,
                'memory_limit': memory_limit,
                'public': is_public,
                'manifest': manifest
            }
        })
    },
    putProblemUpdate(problem_id, title, content, source, time_limit, memory_limit, is_public, manifest) {
        return ajax(`/api/problem/${problem_id}/`, 'put', {
            data: {
                'title': title,
                'content': content,
                'source': source,
                'time_limit': time_limit,
                'memory_limit': memory_limit,
                'public': is_public,
                'manifest': manifest
            }
        })
    },
    deleteProblemDestroy(id) {
        return ajax(`/api/problem/${id}/`, 'delete')
    },
    getSubmissionList(params) {
        let url_params = params || {}
        return ajax('/api/submission/', 'get', {
            params: url_params
        })
    },
    postSubmissionCreate(problem_id, code, lang) {
        return ajax('/api/submission/', 'post', {
            data: {
                'problem': problem_id,
                'code': code,
                'lang': lang
            }
        })
    },
    getSubmissionPersonal(submission_id) {
        return ajax(`/api/submission/${submission_id}/personal/`, 'get')
    },
    changeUserPassword(oldPassword, newPassword, captcha) {
        return ajax('/api/user/password/', 'put', {
            data: {
                'old_password': oldPassword,
                'new_password': newPassword,
                'captcha': captcha
            }
        });
    },
    postWebLangChange(web_lang) {
        return ajax('/api/system/language/', 'post', {
            data: {
                language: web_lang
            }
        })
    },
    getAdvancedUserList(params) {
        let url_params = params || {}
        return ajax('/api/user/advanced/', 'get', {
            params: url_params
        })
    },
    patchAdvancedUserUpdate(user_id, request_data) {
        return ajax(`/api/user/advanced/${user_id}/`, 'patch', {
            data: request_data || {}
        })
    },
    postAdvancedUserPasswordUpdate(user_id) {
        return ajax(`/api/user/advanced/${user_id}/reset_password/`, 'post')
    },
    getSystemInfo() {
        return ajax('/api/system/info/', 'get')
    },
    getMessageQueueInfo() {
        return ajax('/api/system/queue/', 'get')
    },
    getRejudgeRequest(submission_id) {
        return ajax(`/api/submission/${submission_id}/rejudge/`, 'get')
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
