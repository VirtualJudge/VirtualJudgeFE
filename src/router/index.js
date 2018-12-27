import Vue from 'vue'
import Router from 'vue-router'

import Problems from '@/views/problem/Problems';
import Problem from '@/views/problem/Problem';
import Index from '@/views/Index';
import Help from '@/views/Help';
import Setting from '@/views/account/Setting'
import Admin from '@/views/account/Admin'
import Submissions from '@/views/status/Submissions'
import Submission from '@/views/status/Submission'
import Logout from '@/views/account/Logout'

Vue.use(Router);

export default new Router({
  model: history,
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/problem',
      name: 'problems',
      component: Problems
    },
    {
      path: '/help',
      name: 'help',
      component: Help
    },
    {
      path: '/problem/:remote_oj/:remote_id',
      name: 'problem',
      component: Problem
    // }, {
    //   path: '/rank',
    //   name: 'rank',
    //   component: Rank
    }, {
      path: '/submission',
      name: 'submissions',
      component: Submissions
    }, {
      path: '/submission/:id',
      name: 'submission',
      component: Submission
    }, {
      path: '/setting',
      name: 'setting',
      component: Setting
    }, {
      path: '/admin',
      name: 'admin',
      component: Admin
    }, {
      path: '/logout',
      name: 'logout',
      component: Logout
    }
  ]
})
