import MessageDuplex from '../../MessageDuplex';
import { BackgroundAPI } from '../../api';
import Service from './Service'

// chrome.identity.getProfileUserInfo(function (res) {
//   console.log(res, 11111)
// })
// console.log(chrome.identity, 111111)

const infererId = chrome.contextMenus.create({
  type: 'normal',
  title: 'Inferer search: ',
  id: 'inferer',
  contexts: ['all']
}, function () {
  console.log('contextMenus are create.');
});
chrome.contextMenus.onClicked.addListener(function (data) {
  console.log(data)
})

const duplex = new MessageDuplex.Host();

const backgroundScript = {
  service: Service,
  run() {
    BackgroundAPI.init(duplex)
    this.bindPopupDuplex()
    this.bindServiceEvents()
  },
  bindPopupDuplex() {
    //refresh the wallet data
    duplex.on('refresh', ({ resolve }) => {
      // console.log(e)
      // Service.initData()
      console.log(11111)
      resolve()
    });
    duplex.on('initData', async ({ resolve }) => {
      resolve(await this.service.initData())
    })
    // Getter methods
    duplex.on('requestState', ({ resolve }) => {
      resolve(this.service.state)
    });
    duplex.on('changeState', (e) => this.service.changeState(e.data))

    duplex.on('getLanguage', ({ resolve }) => {
      resolve(this.service.getLanguage())
    });
    duplex.on('setLanguage', (e) => this.service.setLanguage(e.data))

    duplex.on('getsearchnum', ({ resolve }) => {
      resolve(this.service.getSearchNum())
    })
    duplex.on('setsearchnum', (e) => this.service.setSearchNum(e.data))

    duplex.on('searchByAddress', (e) => this.service.searchByAddress(e.data))
    duplex.on('getTickets', (e) => this.service.getTickets(e.data))
    duplex.on('getRecommend', (e) => this.service.getRecommend(e.data))
    duplex.on('getLabels', (e) => this.service.getLabels(e.data))

    duplex.on('updateContextmenu', (e) => {
      chrome.contextMenus.update(
        'inferer',
        {
          type: 'normal',
          contexts: ['all'],
          title: 'Inferer search: ' + e.data.text
        },
        function (e) {
          console.log(e)
        }
      )
    })
  },
  bindServiceEvents() {
    this.service.on('setLanguage', language => {
      BackgroundAPI.setLanguage(language)
    })
    this.service.on('newState', appState => {
      BackgroundAPI.setState(appState)
    })
    this.service.on('setSearchNum', num => {
      BackgroundAPI.setSearchNum(num)
    })
  }
}

backgroundScript.run();

// setInterval(() => {
//   BackgroundAPI.setState('Init...' + Date.now());
// }, 2000);