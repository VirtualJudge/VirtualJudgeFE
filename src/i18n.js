import Vue from 'vue'
import VueI18n from 'vue-i18n'
import {DEFAULT_LOCALE, ACCEPT_LOCALES, STORAGE_LOCALE_KEY} from './utils/constant'
import storage from "@/utils/storage";
import en from 'view-design/dist/locale/en-US';
import zh from 'view-design/dist/locale/zh-CN';

Vue.use(VueI18n)
Vue.locale = () => {};
const view_design_locales = {
    'en': en,
    'zh-hans': zh
}

function loadLocaleMessages() {
    const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
    const messages = {}
    locales.keys().forEach(key => {
        const matched = key.match(/([A-Za-z0-9-_]+)\./i)
        if (matched && matched.length > 1) {
            const locale = matched[1]
            messages[locale] = locales(key)
            messages[locale] = Object.assign(locales(key), view_design_locales[locale])
        }

    })
    console.log(messages)
    return messages
}

export default new VueI18n({
    locale: ACCEPT_LOCALES[storage.get(STORAGE_LOCALE_KEY, DEFAULT_LOCALE)].lang,
    fallbackLocale: ACCEPT_LOCALES[DEFAULT_LOCALE].lang,
    messages: loadLocaleMessages()
})
