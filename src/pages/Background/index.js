import MessageDuplex from '../../MessageDuplex';
import { BackgroundAPI } from '../../api';
import Service from './Service'

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
    duplex.on('refresh', (e) => {
      console.log(e)
    });

    // Getter methods
    duplex.on('requestState', ({ resolve }) => {
      resolve(this.service.state)
    });
    duplex.on('changeState', (e) => this.service.changeState(e.data))

    duplex.on('getLanguage', ({ resolve }) => {
      resolve(this.service.getLanguage())
    });
    duplex.on('setLanguage', (e) => this.service.setLanguage(e.data))

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
  }
}

backgroundScript.run();

// setInterval(() => {
//   BackgroundAPI.setState('Init...' + Date.now());
// }, 2000);