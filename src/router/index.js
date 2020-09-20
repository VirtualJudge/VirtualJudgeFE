import Vue from 'vue'
import VueRouter from 'vue-router'
import ViewUI from 'view-design';
import types from "@/store/types";
import store from '../store'
import storage from "@/utils/storage";
import {STORAGE_PROFILE_KEY, SITE_INFO} from "@/utils/constant";
import {Message} from 'view-design'

Vue.use(ViewUI);
Vue.use(VueRouter)

const manageFiles = require.context('./modules', true, /\.js$/)
let configRouters = []
manageFiles.keys().forEach(key => {
    configRouters = configRouters.concat(manageFiles(key).default)
})

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: configRouters
})
router.beforeEach((to, from, next) => {//beforeEach是router的钩子函数，在进入路由前执行
    ViewUI.LoadingBar.start();

    if (to.meta.title) {//判断是否有标题
        document.title = to.meta.title + ' - ' + SITE_INFO.default
    }
    let profile = JSON.parse(storage.get(STORAGE_PROFILE_KEY, "{}"))
    if (to.meta.requireAdmin) {
        if (profile.is_superuser) {
            next();
        } else {
            Message.error('权限不足')
            next({
                path: '/'
            })
        }
    } else if (to.meta.requirePermission) {
        if (profile.is_superuser) {
            next()
        } else {
            let perms = profile.user_permissions || []
            let exist = false
            for (let item in perms) {
                if (item === to.meta.requirePermission) {
                    exist = true
                }
            }
            if (exist) {
                next();
            } else {
                Message.error('权限不足')
                next({
                    path: '/'
                })
            }
        }
    } else if (to.meta.requireAuth) {
        if (profile.username) {
            next();
        } else {
            Message.error('需要登录')
            next({
                path: '/'
            })
        }
    } else {
        next()
    }

})
router.afterEach((to) => {
    ViewUI.LoadingBar.finish();
    store.commit(types.CHANGE_NAV_ACTIVE, {
        active_nav: to.path
    })

});
export default router
