import Vue from 'vue';
import axios from 'axios';

Vue.prototype.$http = 'axios';
axios.default.baseURL = '/api';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.xsrfCookieName = 'csrftoken';

export default {
  getInformation() {
    return ajax('/api/profile/update', 'get')
  },
  updatePasswordAndEmail(data) {
    return ajax('/api/profile/update', 'post', {data: data})

  },
  getStatistics(type) {
    return ajax('/api/statistic/' + type, 'get');
  },
  getPrivilege() {
    return ajax('/api/privilege', 'get');
  },
  requestLogin(username, password) {

    return ajax('/api/auth', 'post', {
      data: {
        'username': username,
        'password': password,
      }
    })
  },
  register(username, email, password) {
    return ajax('/api/register', 'post', {
      data: {
        'username': username,
        'email': email,
        'password': password,
      }
    })
  },
  getProfile() {
    return ajax('/api/profile', 'get');
  },
  logout() {
    return ajax('/api/auth', 'delete')
  },
  getProblems(params) {
    return ajax('/api/problem', 'get', {
      params
    })
  },
  getSupport() {
    return ajax('/api/support', 'get')
  },
  getSubmissions(params) {
    return ajax('/api/submission', 'get', {
      params
    })
  },
  getProblem(remote_oj, remote_id, params) {
    return ajax('/api/problem/' + remote_oj + '/' + remote_id, 'get', {params});
  },

  getLanguage(remote_oj) {
    let params = {
      'platform': remote_oj
    }
    return ajax('/api/language', 'get', {params});
  },
  getRank() {
    return ajax('/api/rank', 'get')
  },
  getAuth() {
    return ajax('/api/auth', 'get');
  },
  getContests() {
    return ajax('/api/contests', 'get');
  },
  getContestProblems(id) {
    return ajax('/api/contest/' + id, 'get');
  },
  submitNewContest(post_data) {
    return ajax('/api/contest/new', 'post', {
      data: post_data
    })
  },
  getAdminSupport() {
    return ajax('/api/admin/support', 'get')
  },
  updateAdminSupport(params, data) {
    console.log(params, data)
    return ajax('/api/admin/support', 'post', {params, data})
  },
  submitCode(remote_oj, remote_id, language, code) {
    return ajax('/api/submission', 'post', {
      data: {
        'remote_oj': remote_oj,
        'remote_id': remote_id,
        'language': language,
        'code': code
      }
    })
  },
  getVerdict(submission_id) {
    return ajax('/api/verdict/' + submission_id, 'get');
  },
  getSpiderAccounts() {
    return ajax('/api/admin/spider', 'get')
  },
  updateSpiderAccount(data) {
    return ajax('/api/admin/spider', 'post', {
      data: data
    })
  },
  deleteSpiderAccount(platform, username) {
    return ajax('/api/admin/spider', 'delete', {
      params: {
        platform: platform,
        username: username
      }
    })
  },
  getHook() {
    return ajax('/api/profile/hook', 'get')

  },
  updateHook(data) {
    return ajax('/api/profile/hook', 'post', {data: data})
  },
  getLanguageAdmin() {
    return ajax('/api/language', 'get')
  },
  updateLanguageAdmin(params, data) {
    return ajax('/api/language', 'post', {params: params, data: data})
  },
  reloadSubmission(submission_id) {
    return ajax('/api/reload/' + submission_id, 'post')
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
