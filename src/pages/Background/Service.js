import axios from 'axios'
import { EventEmitter } from 'eventemitter3';
import { APP_STATE, API_URL } from '../Popup/config/constants';
import { fetcher, poster } from './apis';
import StorageService from './StorageService';

class Service extends EventEmitter {
  constructor() {
    super()
    this.state = APP_STATE.SEARCH
    this.profileUserInfo = { email: '', user_id: '', chrome_id: '' }
    this.matchAddress = []
  }
  async initData() {
    await StorageService.init()
    const userInfo = await this.getProfileUserInfo()
    this.profileUserInfo.email = userInfo.email
    this.profileUserInfo.chrome_id = userInfo.id
    const chromeUserInfo = await StorageService.getChromeUserInfo(userInfo.id)
    if (!chromeUserInfo || !chromeUserInfo.user_id) {
      let registerRet
      registerRet = await this.getUserID(userInfo.email)
      if (!registerRet) {
        registerRet = await this.register(userInfo.email)
      }
      // register
      if (registerRet) {
        this.profileUserInfo.user_id = registerRet
        StorageService.setChromeUserInfo(userInfo.id, { ...userInfo, user_id: registerRet })
      }
    } else {
      this.profileUserInfo.user_id = chromeUserInfo.user_id
    }
    return true
  }
  async getProfileUserInfo() {
    return new Promise(resolve => {
      chrome.identity.getProfileUserInfo(function (res) {
        resolve(res)
      })
    })
  }
  async setAddress(address) {
    this.currentAddress = address.address
    StorageService.setAddress(address.address)
    if (address.address && !this.profileUserInfo.user_id) {
      const res = await this.bindWallet({ wallet_address: address.address, chrome_id: this.profileUserInfo.email })
      if (res.status === 200) {
        this.profileUserInfo.user_id = res.result.user_id
      }
    }
    this.emit('setAddress', address.address)
  }
  changeState(appState) {
    if (this.state === appState) return
    this.state = appState
    this.emit('newState', appState)
  }
  getLanguage() {
    return StorageService.language
  }
  getAddress() {
    return StorageService.address
  }
  setLanguage(language) {
    StorageService.setLanguage(language);
    this.emit('setLanguage', language);
  }
  getSearchNum() {
    return StorageService.searchnum || 20
  }
  setSearchNum(num) {
    StorageService.setSearchNum(num);
    this.emit('setSearchNum', num);
  }
  setMatchAddress(data) {
    console.log(data)
    this.matchAddress = data
    this.emit('setMatchAddress', data);
  }
  connectWallet(data) {
    this.emit('connectWallect', data)
  }

  async register(chrome_id) {
    try {
      const res = await poster('/plugin/register', { chrome_id })
      if (res.status === 200 && res.result) {
        return res.result.user_id || false
      }
    } catch (e) {
      return false
    }
  }

  async getUserID(chrome_id) {
    try {
      const res = await fetcher('/plugin/getUserID', { chrome_id })
      if (res.status === 200 && res.result) {
        return res.result.user_id || false
      }
    } catch (e) {
      return false
    }
  }

  async searchByAddress(address) {
    // 0xAe8F020eC7154E6155a2D17144CE89c054e5dBb8
    try {
      const res = await fetcher('/api/infer', { user_id: this.profileUserInfo.user_id, address })
      return res
    } catch (e) {
      return false
    }

  }

  async getTickets(page_index) {
    try {
      const res = await fetcher('/plugin/getTickets', { user_id: this.profileUserInfo.user_id, page_index })
      return res
    } catch (e) {
      return false
    }
  }

  async getRecommend(local_address_info) {
    try {
      const res = await poster('/plugin/recommend', { user_id: this.profileUserInfo.user_id, local_address_info: this.matchAddress.join(',') })
      return res
    } catch (e) {
      return false
    }
  }

  async getLabels(local_address_info) {
    try {
      const res = await poster('/plugin/getLabels', { user_id: this.profileUserInfo.user_id, local_address_info: this.matchAddress.join(',') })
      return { ...res, matchAddress: this.matchAddress }
    } catch (e) {
      return false
    }
  }

  async collectLabel(data = {}) {
    try {
      const res = await poster('/plugin/collectLabel', { user_id: this.profileUserInfo.user_id, ...data })
      return res
    } catch (e) {
      return false
    }
  }

  async collectTicket(data = {}) {
    try {
      const res = await poster('/plugin/collectTicket', { user_id: this.profileUserInfo.user_id, ...data })
      return res
    } catch (e) {
      return false
    }
  }

  async getCollectTickets(data = {}) {
    try {
      const res = await fetcher('/plugin/getCollectTickets', { user_id: this.profileUserInfo.user_id, page_size: 20, ...data })
      return res
    } catch (e) {
      return false
    }
  }

  async getCollectLabels(data = {}) {
    try {
      const res = await fetcher('/plugin/getCollectLabels', { user_id: this.profileUserInfo.user_id, page_size: 20, ...data })
      return res
    } catch (e) {
      return false
    }
  }

  async feedBack(data = {}) {
    try {
      const res = await poster('/api/feedback', { ...data })
      return res
    } catch (e) {
      return false
    }
  }

  async bindWallet(data = {}) {
    try {
      const res = await poster('/plugin/bindWallet', { chrome_id: this.profileUserInfo.email, ...data })
      return res
    } catch (e) {
      return false
    }
  }
}

export default new Service()