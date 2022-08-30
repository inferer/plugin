
export default {
  init(duplex) {
    this.duplex = duplex;
  },
  initData() {
    return this.duplex.send('initData')
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
  },
  searchByAddress(address) {
    return this.duplex.send('searchByAddress', address)
  },
  getTickets(pageNo) {
    return this.duplex.send('getTickets', pageNo)
  },
  getRecommend(local_address_info) {
    return this.duplex.send('getRecommend', local_address_info)
  },
  getLabels(local_address_info) {
    return this.duplex.send('getLabels', local_address_info)
  },


}
