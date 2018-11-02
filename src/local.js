export default {
  getItem(key) {
    return localStorage.getItem(key);
  },
  setItem(key, value) {
    localStorage.setItem(key, value);
    return this.getItem(key)
  },
  getLastOJ() {
    return this.getItem('LAST_OJ')
  },
  setLastOJ(OJ) {
    return this.setItem('LAST_OJ', OJ)
  },
  setLastLanguage(OJ, LANG) {
    return this.setItem(OJ + '_LANG', LANG);
  },
  getLastLanguage(OJ) {
    return this.getItem(OJ + '_LANG');
  },
  getFilterValue(key) {
    return this.getItem('FILTER' + key)
  },
  setFilterValue(key, value) {
    return this.setItem('FILTER' + key, value)
  }
}
