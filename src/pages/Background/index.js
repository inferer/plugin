import MessageDuplex from '../../MessageDuplex';
import { BackgroundAPI } from '../../api';
import Service from './Service'
import StorageService from './StorageService'




const duplex = new MessageDuplex.Host();

const backgroundScript = {
  service: Service,
  run() {
    BackgroundAPI.init(duplex)
    this.bindPopupDuplex()
    this.bindTabDuplex()
    this.bindServiceEvents()
  },
  bindPopupDuplex() {
    //refresh the wallet data
    duplex.on('refresh', ({ resolve }) => {
      // console.log(e)
      // Service.initData()
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
    duplex.on('setAddress', (e) => this.service.setAddress(e.data))

    duplex.on('getsearchnum', ({ resolve }) => {
      resolve(this.service.getSearchNum())
    })
    duplex.on('setsearchnum', (e) => this.service.setSearchNum(e.data))
    duplex.on('setChainId', (e) => this.service.setChainId(e.data))
    duplex.on('setMatchAddress', (e) => {
      console.log(e)
      // this.service.setMatchAddress(e.data)
    })

    duplex.on('searchByAddress', async (e) => {
      const data = await this.service.searchByAddress(e.data)
      e.resolve(data)
    })
    duplex.on('getFeedAddress', ({ resolve }) => {
      resolve(this.service.feedAddress)
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
    duplex.on('cancelCollectLabel', async (e) => {
      const data = await this.service.cancelCollectLabel(e.data)
      e.resolve(data)
    })
    duplex.on('collectTicket', async (e) => {
      const data = await this.service.collectTicket(e.data)
      e.resolve(data)
    })
    duplex.on('cancelCollectTicket', async (e) => {
      const data = await this.service.cancelCollectTicket(e.data)
      e.resolve(data)
    })
    duplex.on('feedBack', async (e) => {
      const data = await this.service.feedBack(e.data)
      e.resolve(data)
    })
    duplex.on('getAddress', async (e) => {
      const data = await this.service.getAddress(e.data)
      e.resolve(data)
    })
    duplex.on('setCloseTime', async (e) => {
      const data = await this.service.setCloseTime(e.data)
      e.resolve(data)
    })
    duplex.on('getCloseTime', async (e) => {
      const data = await this.service.getCloseTime(e.data)
      e.resolve(data)
    })
    duplex.on('bindWallet', async (e) => {
      const data = await this.service.bindWallet(e.data)
      e.resolve(data)
    })
    duplex.on('connectWallet', (e) => this.service.connectWallet(e.data))

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
  bindTabDuplex() {
    duplex.on('tabRequest', async ({ hostname, resolve, data: request }) => {
      const { action, data, uuid } = request
      switch (action) {
        case 'connectWallet':
          Service.setAddress(data)
          resolve({
            success: true,
            data: 'success',
            uuid
          })
          break
        case 'updateContextmenu':
          backgroundScript.menuAddress = data.str
          chrome.contextMenus.update(
            'inferer',
            {
              type: 'normal',
              contexts: ['all'],
              title: 'Inferer search: ' + (data.str.length > 42 ? data.str.slice(0, 42) + '...' : data.str)
            },
            function (e) {
              console.log(e)
            }
          )
          resolve({
            success: true,
            data: 'success',
            uuid
          })
          break
        case 'setMatchAddress':
          const newAddress = data.addressList ? data.addressList.slice(0, 12) : []
          // console.log(StorageService.getStorage('searchnum'))
          Service.setMatchAddress(newAddress)
          resolve({
            success: true,
            data: 'success',
            uuid
          })
          break

      }

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
    this.service.on('connectWallect', (type) => {
      BackgroundAPI.connectWallect(type)
    })
    this.service.on('setAddress', (address) => {
      BackgroundAPI.setAddress(address)
    })
  }
}

backgroundScript.run();

chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.removeAll(function () {
    chrome.contextMenus.create({
      type: 'normal',
      title: 'Inferer search: ',
      id: 'inferer',
      contexts: ['page'],
      // onclick: function (data) {
      //   console.log(data)
      // }
    }, function () {
      console.log('contextMenus are create.');
      chrome.contextMenus.onClicked.addListener(function (data) {
        console.log(data)
        chrome.management.getSelf(
          function (info) {
            console.log(info)
            chrome.windows.create({
              focused: true,
              width: 360,
              height: 632,
              type: 'popup',
              url: 'popup.html?address=' + backgroundScript.menuAddress,
              left: 1500,
              top: 0

              // incognito: true,
              // setSelfAsOpener: true
            },
              () => {

              })

          }
        )

      })
    });
  })

});