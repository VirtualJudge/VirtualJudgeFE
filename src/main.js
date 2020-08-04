import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import ViewUI from 'view-design';
import '../theme/index.less';

Vue.use(ViewUI);
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
