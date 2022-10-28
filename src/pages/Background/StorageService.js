import extensionizer from 'extensionizer'
const StorageService = {
  storageKeys: [
    'language',
    'searchnum',
    'address',
    'searchResult',
    'user_id',
    'collectTicket',
    'closeTime',
    'injectSuccess'
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
      if (!this['searchnum']) {
        this['searchnum'] = 20
        this.save('searchnum')
      }
      if (!this['language']) {
        this.language = 'en'
        this.save('language')
      }
      if (!this['closeTime']) {
        this.closeTime = 0
        this.save('closeTime')
      }
      if (!this['injectSuccess']) {
        this.injectSuccess = 'null'
        this.save('injectSuccess')
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
  },
  setCollectTicket(data) {
    if (this.collectTicket) {
      this.collectTicket.push(data)
    } else {
      this.collectTicket = []
      this.collectTicket.push(data)
    }
    this.save('collectTicket')
  },
  cancelCollectTicket(data) {
    this.collectTicket = data
    this.save('collectTicket')
  },
  setCollectLabels(data) {
    if (this.collectLabels) {
      this.collectLabels.push(data)
    } else {
      this.collectLabels = []
      this.collectLabels.push(data)
    }
    this.save('collectLabels')
  },
  cancelCollectLabels(data) {
    this.collectLabels = data
    this.save('collectLabels')
  },
  setCloseTime(time) {
    this.closeTime = time || Date.now()
    this.save('closeTime')
  },
  setInject(str) {
    this.injectSuccess = str
    this.save('injectSuccess')
  },
  setChangeAddress(str) {
    this.changeAddress = str
    this.save('changeAddress')
  }

}

export default StorageService