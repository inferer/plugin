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
    this.chainid = 1
    this.matchAddress = []
    this.feedAddress = ''
  }
  async initData() {
    await StorageService.init()
    this.state = APP_STATE.SEARCH
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
      this.profileUserInfo.user_id = chromeUserInfo.user_id || await StorageService.getUserId()
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
    if (address.address === 'notinstall') {
      this.emit('setAddress', address.address)
      return
    }
    if (address.address && !this.profileUserInfo.user_id) {
      const res = await this.bindWallet({ wallet_address: address.address })
      if (res.status === 200) {
        this.profileUserInfo.user_id = res.result.user_id
        StorageService.setUserId(res.result.user_id)
        // chrome.runtime.reload()
      }
    }
    this.currentAddress = address.address
    StorageService.setAddress(address.address)
    this.emit('setAddress', address.address)
  }
  changeState(appState) {
    if (this.state === appState) return
    this.state = appState
    this.emit('newState', appState)
  }
  getLanguage() {
    return StorageService.language || 'en'
  }
  async getCloseTime() {
    return await StorageService.getStorage('closeTime')
  }
  async setCloseTime() {
    return await StorageService.setCloseTime()
  }
  getAddress() {
    return StorageService.getStorage('address')
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
  setChainId(data) {
    // StorageService.setSearchNum(num);
    // this.emit('setSearchNum', num);
    this.chainid = data.chainid
  }
  setMatchAddress(data) {
    console.log(data)
    this.matchAddress = data
    this.emit('setMatchAddress', data);
  }
  connectWallet(data) {
    if (this.currentAddress) {
      this.emit('setAddress', this.currentAddress)
    } else {
      this.emit('connectWallect', data)
    }
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
      console.log(e)
      return false
    }
  }

  async searchByAddress(address) {
    console.log(address)
    try {
      this.feedAddress = address.address
      const chainid = address.chainid ?? 1

      const res = await fetcher(chainid === 1 ? '/api/infer' : '/api/platon/infer',
        { user_id: this.profileUserInfo.user_id, address: address.address })
      if (res.status === 200) {
        StorageService.setSearchResult({
          chainid: this.chainid,
          content: JSON.stringify(res.result),
          search_address: address,
          timestamp: new Date().toString()
        })
      }
      return res
    } catch (e) {
      return false
    }

  }

  async getTickets(page_index) {
    try {
      const res = await fetcher('/plugin/getTickets', { user_id: this.profileUserInfo.user_id, page_index, page_size: 10 })
      if (typeof res.result === 'string') {
        const searchResult = await StorageService.getStorage('searchResult')
        return {
          ...res,
          result: searchResult || []
        }
      }
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
      const res = await poster('/plugin/getLabels', { user_id: this.profileUserInfo.user_id || 'unknown', local_address_info: this.matchAddress.join(',') })
      return { ...res, matchAddress: this.matchAddress }
    } catch (e) {
      return false
    }
  }

  async collectLabel(data = {}) {
    try {
      let res = { status: 200 }
      if (this.profileUserInfo.user_id) {
        res = await poster('/plugin/collectLabel', { user_id: this.profileUserInfo.user_id, ...data, chainid: this.chainid })
      } else {
        await StorageService.setCollectLabels({
          chainid: this.chainid,
          label: data.label_info,
          collect_address: data.collect_address,
          timestamp: new Date().toString()
        })
      }
      return res
    } catch (e) {
      return false
    }
  }
  async cancelCollectLabel(data = {}) {
    try {
      const res = await poster('/plugin/cancelCollectLabel', { user_id: this.profileUserInfo.user_id, ...data, chainid: this.chainid })
      const collectLabels = await StorageService.getStorage('collectLabels')
      if (collectLabels && collectLabels.length > 0) {
        const filterList = collectLabels.filter(item => item.collect_address !== data.collect_address)
        StorageService.storage.clear('collectLabels')
        filterList.forEach(async (item) => {
          await StorageService.setCollectLabels(item)
        })
      }

      return res
    } catch (e) {
    }
  }

  async collectTicket(data = {}) {
    try {
      let res = { status: 200 }
      if (this.profileUserInfo.user_id) {
        res = await poster('/plugin/collectTicket', { user_id: this.profileUserInfo.user_id, ...data, chainid: this.chainid })
      } else {
        await StorageService.setCollectTicket({
          chainid: this.chainid,
          ticket_id: '',
          ticket_level: data.ticket_level,
          collect_address: data.collect_address,
          timestamp: new Date().toString()
        })
      }
      return res
    } catch (e) {
      return false
    }
  }

  async cancelCollectTicket(data = {}) {
    try {
      let res = { status: 200 }
      if (this.profileUserInfo.user_id) {
        res = await poster('/plugin/cancelCollectTicket', { user_id: this.profileUserInfo.user_id, ...data, chainid: this.chainid })
      } else {
        await StorageService.setCollectTicket({
          chainid: this.chainid,
          ticket_id: '',
          ticket_level: data.ticket_level,
          collect_address: data.collect_address,
          timestamp: new Date().toString()
        })
      }
      return res
    } catch (e) {
      return false
    }
  }


  async getCollectTickets(data = {}) {
    try {
      const res = await fetcher('/plugin/getCollectTickets', { user_id: this.profileUserInfo.user_id, page_size: 20, ...data })
      if (typeof res.result === 'string') {
        const collectTickets = await StorageService.getStorage('collectTicket')
        return {
          ...res,
          result: collectTickets || []
        }
      } else {
        return res
      }
    } catch (e) {
      return false
    }
  }

  async getCollectLabels(data = {}) {
    try {
      const res = await fetcher('/plugin/getCollectLabels', { user_id: this.profileUserInfo.user_id, page_size: 20, ...data })
      if (typeof res.result === 'string') {
        const collectLabels = await StorageService.getStorage('collectLabels')
        return {
          ...res,
          result: collectLabels || []
        }
      } else {
        return res
      }
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
      const res = await poster('/plugin/bindWallet', { user_id: this.profileUserInfo.email, ...data })
      return res
    } catch (e) {
      return false
    }
  }
}

export default new Service()