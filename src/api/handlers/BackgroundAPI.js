
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
  }

};
