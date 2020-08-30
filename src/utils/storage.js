export default {
    get(key, val) {
        console.log(`get key ${key} from storage`)
        return window.localStorage.getItem(key) || val
    },
    set(key, val) {
        window.localStorage.setItem(key, val)
    },
    del(key) {
        window.localStorage.removeItem(key)
    }
}
