
export default {
  currentAccount: false,

  init(duplex) {
    this.duplex = duplex;
  },

  setState(appState) {
    this.duplex.send('popup', 'setState', appState, false);
  },
  setLanguage(language) {
    this.duplex.send('popup', 'setLanguage', language, false);
  },
  setSearchNum(num) {
    this.duplex.send('popup', 'setSearchNum', num, false);
  },
  setAddress(address) {
    this.duplex.send('popup', 'setAddress', address, false);
  },
  connectWallect(type) {
    this.duplex.send('tab', 'injectPlugin', { action: 'connectWallect', data: type }, false)
  },
  disconnectWallet(type) {
    this.duplex.send('tab', 'injectPlugin', { action: 'disconnectWallet', data: type }, false)
  },
  setMenuAddress(address) {
    this.duplex.send('popup', 'setMenuAddress', address, false);
  }
};
