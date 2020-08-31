export default {
    get(key, val) {
        return window.localStorage.getItem(key) || val
    },
    set(key, val) {
        window.localStorage.setItem(key, val)
    },
    del(key) {
        window.localStorage.removeItem(key)
    }
}
