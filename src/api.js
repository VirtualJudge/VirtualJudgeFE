import Vue from 'vue';
import axios from 'axios';

Vue.prototype.$http = 'axios';
axios.default.baseURL = '/api';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.xsrfCookieName = 'csrftoken';

export default {
  requestLogin(username, password) {
    return ajax('/api/auth/', 'post', {
      data: {
        'username': username,
        'password': password,
      }
    })
  },
  register(username, email, password) {
    return ajax('/api/register/', 'post', {
      data: {
        'username': username,
        'email': email,
        'password': password,
      }
    })
  },
  getProfile() {
    return ajax('/api/profile/', 'get');
  },
  logout() {
    return ajax('/api/auth/', 'delete')
  },
  getProblems() {
    return ajax('/api/problems/', 'get')
  },
  getSupport() {
    return ajax('/api/support/', 'get')
  },
  getSubmissions(params) {
    return ajax('/api/submissions/', 'get', {
      params
    })
  },
  getProblem(remote_oj, remote_id) {
    return ajax('/api/problem/' + remote_oj + '/' + remote_id + '/', 'get');
  },
  getLanguages(remote_oj) {
    return ajax('/api/languages/' + remote_oj + '/', 'get');
  },
  getRank() {
    return ajax('/api/rank/', 'get')
  },
  getAuth() {
    return ajax('/api/auth/', 'get');
  },
  getContests() {
    return ajax('/api/contests/', 'get');
  },
  getContestProblems(id) {
    return ajax('/api/contest/' + id + '/', 'get');
  },
  submitNewContest(post_data) {
    return ajax('/api/contest/new/', 'post', {
      data: post_data
    })
  },
  submitCode(remote_oj, remote_id, language, code) {
    return ajax('/api/submission/', 'post', {
      data: {
        'remote_oj': remote_oj,
        'remote_id': remote_id,
        'language': language,
        'code': code
      }
    })
  },
  refreshProblem(remote_oj, remote_id) {
    return ajax('/api/problem/refresh/' + remote_oj + '/' + remote_id + '/', 'get')
  },
  getVerdict(submission_id) {
    return ajax('/api/verdict/' + submission_id + '/', 'get');
  }
}

/**
 * @param url
 * @param method get|post|put|delete...
 * @param params like queryString. if a url is index?a=1&b=2, params = {a: '1', b: '2'}
 * @param data post data, use for method put|post
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
      // API正常返回(status=20x), 是否错误通过有无error判断
      if (res.data.status === 0) {
        //Vue.prototype.$error(res.data.data)
        resolve(res);
        // 若后端返回为登录，则为session失效，应退出当前登录用户
        //if (res.status === '1') {
        // store.dispatch('changeModalStatus', {'mode': 'login', 'visible': true})
        //}
      } else {
        reject(res)
        // if (method !== 'get') {
        //   Vue.prototype.$success('Succeeded')
        // }
      }
    }, res => {
      // API请求异常，一般为Server error 或 network error
      reject(res)
      //Vue.prototype.$error(res.data.data)
    })
  })
}
