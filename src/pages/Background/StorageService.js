import extensionizer from 'extensionizer'
const StorageService = {
  storageKeys: [
    'language',
    'searchnum'
  ],
  storage: extensionizer.storage.local,
  async init() {
    try {
      for (let i = 0; i < this.storageKeys.length; i++) {
        const key = this.storageKeys[i];
        const encrypted = await this.getStorage(key);

        if (!encrypted)
          continue;

        this[key] = encrypted;
      }
    } catch (ex) {
      return 'ERRORS.INVALID_PASSWORD';
    }
  },
  getStorage(key) {
    return new Promise(resolve => (
      this.storage.get(key, data => {
        if (key in data)
          return resolve(data[key]);
        resolve(false);
      })
    ));
  },
  save(...keys) {
    if (!keys.length)
      keys = this.storageKeys;
    keys.forEach(key => (
      this.storage.set({
        [key]: this[key]
      })
    ));

  },
  setLanguage(language) {
    this.language = language;
    this.save('language');
  },
  setSearchNum(num) {
    this.searchnum = num;
    this.save('searchnum');
  },
  setChromeUserInfo(chrome_id, userInfo) {
    this[chrome_id] = userInfo
    this.save(chrome_id)
  },
  getChromeUserInfo(chrome_id) {
    return this.getStorage(chrome_id)
  }
}

export default StorageService