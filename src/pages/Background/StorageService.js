import extensionizer from 'extensionizer'
const StorageService = {
  storageKeys: [
    'language',
    'searchnum',
    'address',
    'searchResult',
    'user_id'
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
      this['searchnum'] = 12
      this.save('searchnum')
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
  setAddress(address) {
    this.address = address;
    this.save('address');
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
  },
  setSearchResult(data) {
    if (this.searchResult) {
      this.searchResult.push(data)
    } else {
      this.searchResult = []
      this.searchResult.push(data)
    }
    this.save('searchResult')
  },
  setUserId(user_id) {
    this.user_id = user_id
    this.save('user_id')
  },
  getUserId() {
    return this.getStorage('user_id')
  }

}

export default StorageService