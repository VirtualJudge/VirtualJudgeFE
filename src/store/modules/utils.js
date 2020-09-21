import types from '../types'

const state = {
    captcha_random: ''
}

const getters = {
    captcha_url: state => state.captcha_random,
}

const mutations = {
    [types.CHANGE_CAPTCHA](state, {captcha_random}) {
        state.captcha_random = captcha_random
    }
}

const actions = {
    randomCaptcha({commit}) {
        commit(types.CHANGE_CAPTCHA, {
            captcha_random: '/api/captcha/?id='+Math.random()
        })
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
