import axios from 'axios'
import { EventEmitter } from 'eventemitter3';
import { APP_STATE } from '../Popup/config/constants';
import StorageService from './StorageService';

class Service extends EventEmitter {
  constructor() {
    super()
    this.state = APP_STATE.SEARCH
  }
  getLanguage() {
    return StorageService.language
  }
  setLanguage(language) {
    StorageService.setLanguage(language);
    this.emit('setLanguage', language);
  }
  changeState(appState) {
    if (this.state === appState) return
    this.state = appState
    this.emit('newState', appState)
  }
}

export default new Service()