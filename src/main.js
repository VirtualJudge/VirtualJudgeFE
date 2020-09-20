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

import * as Sentry from "@sentry/browser";
import {Vue as VueIntegration} from "@sentry/integrations";
import {Integrations} from '@sentry/tracing';

if (process.env.NODE_ENV !== 'development') {
    Sentry.init({
        dsn: "https://c7abc7b0bd624adbac03e35318b20142@o428533.ingest.sentry.io/5426345",
        integrations: [
            new VueIntegration({
                Vue,
                tracing: true
            }),
            new Integrations.BrowserTracing()
        ],
        tracesSampleRate: 1
    });
}
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
