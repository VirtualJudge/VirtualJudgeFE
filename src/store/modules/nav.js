import types from '../types'
import {ACCEPT_LOCALES, DEFAULT_LOCALE, STORAGE_LOCALE_KEY} from "@/utils/constant";
import storage from "@/utils/storage";
import api from "@/utils/api";
import message from "@/utils/message";
import moment from "moment";
const state = {
    active_nav: '/',
    web_lang: DEFAULT_LOCALE
}

const getters = {
    active_nav: state => state.active_nav,
    web_lang: state => state.web_lang
}

const mutations = {
    [types.CHANGE_NAV_ACTIVE](state, {active_nav}) {
        state.active_nav = '/' + active_nav.split('/')[1]
    },
    [types.CHANGE_WEB_LANGUAGE](state, {web_lang}) {
        state.web_lang = web_lang
    }
}

const actions = {
    getWebLang({commit}) {
        let lang = storage.get(STORAGE_LOCALE_KEY, DEFAULT_LOCALE)
        moment.locale(ACCEPT_LOCALES[lang].moment)
        api.postWebLangChange(ACCEPT_LOCALES[lang].lang).then(res => {
            if (res.data.err !== null) {
                this.$Message.error('切换语言错误，' + message.err(res.data.err))
            }
        })
        commit(types.CHANGE_WEB_LANGUAGE, {
            web_lang: lang
        })
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
