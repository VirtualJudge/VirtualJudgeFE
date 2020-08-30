import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import ViewUI from 'view-design';
import '../theme/index.less';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import VueHighlightJS from 'vue-highlightjs'
import 'highlight.js/styles/atom-one-light.css'
import VueClipboard from 'vue-clipboard2'
import i18n from './i18n'

Vue.use(VueClipboard)
Vue.use(VueHighlightJS)
Vue.use(mavonEditor)
Vue.use(ViewUI);
Vue.config.productionTip = false

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')
