function keyMirror(obj) {
    if (obj instanceof Object) {
        const _obj = Object.assign({}, obj);
        const _keyArray = Object.keys(obj);
        _keyArray.forEach(key => {
            _obj[key] = key
        })
        return _obj
    }
}

export default keyMirror({
    'CHANGE_PROFILE': null,
    'CHANGE_EMAIL_HASH': null,
    'CHANGE_CAPTCHA': null,
    'CHANGE_NAV_ACTIVE': null,
    'CHANGE_WEB_LANGUAGE': null,
    'CHANGE_PROBLEM_SUBMIT_KEY': null
})
