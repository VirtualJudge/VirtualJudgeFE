import types from '../types'
import api from '../../utils/api'
import md5 from 'js-md5'

const state = {
    profile: {},
    emailHashURL: '',
}

const getters = {
    emailHashURL: state => state.emailHashURL,
    profile: state => state.profile,
    userUrl: state => state.profile.id ? `/user/${state.profile.id}` : '',
    isAuthenticated: (state, getters) => {
        return !!getters.profile.username
    },
    isAdminRole: (state, getters) => {
        return getters.profile.is_superuser === true
    },
}

const mutations = {
    [types.CHANGE_PROFILE](state, {profile, emailHashURL}) {
        state.profile = profile
        state.emailHashURL = emailHashURL
    }
}

const actions = {
    getProfile({commit}) {
        api.getUserInformation().then(res => {
            let email = ''
            if (res.data.data) {
                email = res.data.data.email ? res.data.data.email : ''
            }
            commit(types.CHANGE_PROFILE, {
                profile: res.data.data || {},
                emailHashURL: 'https://cn.gravatar.com/avatar/' + (email ? md5(email) + '?s=200' : '')
            })
        })
    },
    clearProfile({commit}) {
        api.deleteUserInformation().then(() => {
            commit(types.CHANGE_PROFILE, {
                profile: {}, emailHashURL: ''
            })
        })
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
