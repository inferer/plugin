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
  }
  async initData() {
    await StorageService.init()
    const userInfo = await this.getProfileUserInfo()
    console.log(userInfo)
    this.profileUserInfo.email = userInfo.email
    this.profileUserInfo.chrome_id = userInfo.id
    const chromeUserInfo = await StorageService.getChromeUserInfo(userInfo.id)
    if (!chromeUserInfo || !chromeUserInfo.user_id) {
      // register
      const registerRet = await this.register(userInfo.id)
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
  changeState(appState) {
    if (this.state === appState) return
    this.state = appState
    this.emit('newState', appState)
  }
  getLanguage() {
    return StorageService.language
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

  async register(chrome_id) {
    const res = await poster('/plugin/register', { chrome_id })
    if (res.status === 200 && res.result) {
      return res.result.user_id || false
    }
    return false
  }

  async searchByAddress(address) {
    // 0xAe8F020eC7154E6155a2D17144CE89c054e5dBb8
    const res = await fetcher('/api/inferer', { address })
    console.log(res)
    return res
  }

  async getTickets(page_index) {
    const res = await poster('/plugin/getTickets', { user_id: this.profileUserInfo.user_id, page_index })
    console.log(res)
    return res
  }

  async getRecommend(local_address_info) {
    const res = await poster('/plugin/recommend', { user_id: this.profileUserInfo.user_id, local_address_info })
    console.log(res)
    return res
  }

  async getLabels(local_address_info) {
    const res = await poster('/plugin/getLabels', { user_id: this.profileUserInfo.user_id, local_address_info })
    console.log(res)
    return res
  }
}

export default new Service()