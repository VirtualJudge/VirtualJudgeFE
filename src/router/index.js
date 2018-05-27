import Vue from 'vue'
import Router from 'vue-router'

import Problems from '@/views/problem/Problems';
import Problem from '@/views/problem/Problem';
import Index from '@/views/Index';
import Rank from '@/views/account/Rank'
import Profile from '@/views/account/Profile'
import Submissions from '@/views/status/Submissions'
import Contests from '@/views/contest/Contests'
import Logout from '@/views/account/Logout'
import NewContest from '@/views/contest/NewContest'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/problems',
      name: 'problems',
      component: Problems
    },
    {
      path: '/problem/:remote_oj/:remote_id',
      name: 'problem',
      component: Problem
    }, {
      path: '/rank',
      name: 'rank',
      component: Rank
    }, {
      path: '/submissions',
      name: 'submissions',
      component: Submissions
    }, {
      path: '/submission/:id',
      name: 'submission',
      component: Submissions
    }, {
      path: '/contests',
      name: 'contests',
      component: Contests
    }, {
      path: '/contests/new',
      name: 'new_contest',
      component: NewContest
    }, {
      path: '/profile',
      name: 'profile',
      component: Profile
    }, {
      path: '/logout',
      name: 'logout',
      component: Logout
    }
  ]
})
