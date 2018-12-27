// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import CodeMirror from 'vue-codemirror-lite';
import Vuex from 'vuex';
import "@/styles/default.less";
import VueClipboard from 'vue-clipboard2'
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';


Vue.use(Vuex)
Vue.use(CodeMirror)
Vue.use(iView)
Vue.use(VueClipboard)
Vue.config.productionTip = false;
const options = {
  release: process.env.VERSION,
  ignoreUrls: [
    // Chrome extensions
    /extensions\//i,
    /^chrome:\/\//i,
    // Firefox extensions
    /^resource:\/\//i,
    // Ignore Google flakiness
    /\/(gtm|ga|analytics)\.js/i
  ]
}

Raven
  .config('https://42e1aa5b6ee34641a0435f683bd0087b@sentry.io/1360323', options)
  .addPlugin(RavenVue, Vue)
  .install()

Raven.setUserContext({
  version: process.env.VERSION,
  location: window.location
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});

