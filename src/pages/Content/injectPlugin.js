
import jQuery from '../../assets/js/jquery-3.6.0.min.js';
import EventChannel from '../../MessageDuplex/EventChannel'

import RequestHandler from '../../MessageDuplex/RequestHandler';


export const matchAddress = (injectPlugin) => {
  document.addEventListener('selectionchange', function (e) {
    const selectStr = window.getSelection().toString()
    if (selectStr) {
      injectPlugin.updateContextmenu(selectStr)
    }
  })
  setTimeout(() => {
    const bodyStr = jQuery('body').text()
    const addressList = bodyStr.match(/(0x[a-zA-Z0-9]{40})/g)
    injectPlugin.setMatchAddress(addressList)
  }, 5000)
}

const injectPlugin = {
  init() {
    this._bindInjectPlugin();
    this._bindEventChannel();
    this._bindEvents();
    matchAddress(injectPlugin)

    this.request('init').then((params) => {

    }).catch(err => {
      console.log('Failed to initialise Plugin', err);
    });
  },

  _bindInjectPlugin() {
    const injectPlugin = {}
    injectPlugin.extension = {}; //add a extension object for black list
    injectPlugin.extension.connectMetamask = (address) => {
      this.connectMetamask(address)
    };
    window.injectPlugin = injectPlugin;
  },

  _bindEventChannel() {
    this.eventChannel = new EventChannel('injectPlugin');
    this.request = RequestHandler.init(this.eventChannel);
  },

  _bindEvents() {
    this.eventChannel.on('connectWallect', type => {
      window.ethereum.enable()
        .then(res => {
          if (res && res[0]) {
            window.injectPlugin.extension.connectMetamask(res[0])
          }

        })
    })
  },
  connectMetamask(address) {
    this.request('connectWallet', {
      address
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  updateContextmenu(str) {
    this.request('updateContextmenu', {
      str
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  setMatchAddress(addressList) {
    this.request('setMatchAddress', {
      addressList
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }

};

injectPlugin.init();

