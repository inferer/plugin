
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
  getFeedAddress() {
    return this.duplex.send('getFeedAddress')
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
  getCollectTickets(data) {
    return this.duplex.send('getCollectTickets', data)
  },
  getCollectLabels(data) {
    return this.duplex.send('getCollectLabels', data)
  },
  collectLabel(data) {
    return this.duplex.send('collectLabel', data)
  },
  cancelCollectLabel(data) {
    return this.duplex.send('cancelCollectLabel', data)
  },
  collectTicket(data) {
    return this.duplex.send('collectTicket', data)
  },
  feedBack(data) {
    return this.duplex.send('feedBack', data)
  },
  bindWallet(data) {
    return this.duplex.send('bindWallet', data)
  },
  connectWallet(data) {
    return this.duplex.send('connectWallet', data)
  },
  getAddress() {
    return this.duplex.send('getAddress')
  },
  setAddress() {
    this.duplex.send('setAddress', { address: '' })
  },
  matchAddress(addressList) {
    console.log(addressList)
    this.duplex.send('setMatchAddress', { addressList })
  }

}
