import MessageDuplex from '../../MessageDuplex'
import EventChannel from '../../MessageDuplex/EventChannel';
import { initDom } from './modules/insertDom';


const contentScript = {
  duplex: new MessageDuplex.Tab(),
  eventChannel: new EventChannel('contentScript'),

  init() {
    this.registerListeners();
    this.inject();
  },

  registerListeners() {
    this.eventChannel.on('injectPlugin', async data => {
      try {
        this.eventChannel.send(
          'injectPuginReply',
          await this.duplex.send('tabRequest', data)
        );
      } catch (ex) {
        console.log('Ta b request failed:', ex);
      }
    });

    this.duplex.on('injectPlugin', ({ action, data }) => {
      this.eventChannel.send(action, data);
    });
  },

  inject() {
    const injectionSite = (document.head || document.documentElement);
    const container = document.createElement('script');

    container.src = chrome.runtime.getURL('injectPlugin.bundle.js');
    container.onload = function () {
      this.parentNode.removeChild(this);
    };

    injectionSite.insertBefore(
      container,
      injectionSite.children[0]
    );
  }
};

contentScript.init();




