
export default {
  init(duplex) {
    this.duplex = duplex;
  },

  //Data refresh
  refresh() {
    return this.duplex.send('refresh');
  },
  // Data requesting

  requestState() {
    return this.duplex.send('requestState');
  },
  changeState(appState) {
    return this.duplex.send('changeState', appState, false);
  },
  getLanguage() {
    return this.duplex.send('getLanguage');
  },
  setLanguage(language) {
    this.duplex.send('setLanguage', language)
  },
  getSearchNum() {
    return this.duplex.send('getsearchnum')
  },
  setSearchNum(num) {
    this.duplex.send('setsearchnum', num)
  },

  updateContextmenu(text) {
    return this.duplex.send('updateContextmenu', { text })
  }
}
