import Vue from 'vue'
import VueRouter from 'vue-router'
import ViewUI from 'view-design';
import types from "@/store/types";
import store from '../store'

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
        document.title = to.meta.title
    }
    next()
})
router.afterEach((to) => {
    ViewUI.LoadingBar.finish();
    store.commit(types.CHANGE_NAV_ACTIVE, {
        active_nav: to.path
    })

});
export default router
