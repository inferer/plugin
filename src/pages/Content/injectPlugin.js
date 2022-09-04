import { data } from 'autoprefixer';
import EventChannel from '../../MessageDuplex/EventChannel'

import RequestHandler from '../../MessageDuplex/RequestHandler';

const injectPlugin = {
  init() {
    this._bindInjectPlugin();
    this._bindEventChannel();
    this._bindEvents();

    this.request('init').then((params) => {

    }).catch(err => {
      logger.error('Failed to initialise VisionWeb', err);
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

};

injectPlugin.init();
