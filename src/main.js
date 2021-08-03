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


// import * as Sentry from "@sentry/vue";
// import {Integrations} from "@sentry/tracing";

// if (process.env.NODE_ENV !== 'development') {
//     Sentry.init({
//         dsn: "https://26173e38ab6c4c4a9f032a50a1ba5c6d@o879407.ingest.sentry.io/5832107",
//         integrations: [
//             new Integrations.BrowserTracing()
//         ],
//         tracesSampleRate: 1.0
//     });
// }
Vue.use(VueClipboard)
Vue.use(VueHighlightJS)
Vue.use(mavonEditor)
Vue.use(ViewUI);
Vue.config.productionTip = false
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
