import types from '../types'

const state = {
    active_nav: '/'
}

const getters = {
    active_nav: state => state.active_nav,
}

const mutations = {
    [types.CHANGE_NAV_ACTIVE](state, {active_nav}) {
        state.active_nav = active_nav
    }
}

const actions = {
}

export default {
    state,
    getters,
    actions,
    mutations
}
