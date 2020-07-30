import Vue from 'vue'
import Vuex from 'vuex'
import user from "./modules/user";
import utils from "./modules/utils";

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        user,
        utils
    },
    strict: debug
})
