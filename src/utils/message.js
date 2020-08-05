export default {
    err(data){
        let res = ''
        if (typeof (data) === 'string') {
            res += data
        } else if (typeof (data) === 'object') {
            for (const key1 in data) {
                if (Object.prototype.hasOwnProperty.call(data, key1)) {
                    res += `${key1}:${data[key1]}\n`
                }
            }
        }
        return res
    }
}
