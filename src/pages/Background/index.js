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

    duplex.on('searchByAddress', async (e) => {
      const data = await this.service.searchByAddress(e.data)
      e.resolve(data)
    })
    duplex.on('getTickets', async (e) => {
      const data = await this.service.getTickets(e.data)
      e.resolve(data)
    })
    duplex.on('getRecommend', async (e) => {
      const data = await this.service.getRecommend(e.data)
      e.resolve(data)
    })
    duplex.on('getLabels', async (e) => {
      const data = await this.service.getLabels(e.data)
      e.resolve(data)
    })
    duplex.on('getCollectTickets', async (e) => {
      const data = await this.service.getCollectTickets(e.data)
      e.resolve(data)
    })
    duplex.on('getCollectLabels', async (e) => {
      const data = await this.service.getCollectLabels(e.data)
      e.resolve(data)
    })
    duplex.on('collectLabel', async (e) => {
      const data = await this.service.collectLabel(e.data)
      e.resolve(data)
    })
    duplex.on('collectTicket', async (e) => {
      const data = await this.service.collectTicket(e.data)
      e.resolve(data)
    })
    duplex.on('feedBack', async (e) => {
      const data = await this.service.feedBack(e.data)
      e.resolve(data)
    })

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