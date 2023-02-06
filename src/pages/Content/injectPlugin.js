
import jQuery from '../../assets/js/jquery-3.6.0.min.js';
import EventChannel from '../../MessageDuplex/EventChannel'
import RequestHandler from '../../MessageDuplex/RequestHandler';
import './modules/WallectConnect'

export const matchAddress = (injectPlugin) => {
  document.addEventListener('selectionchange', function (e) {
    const selectStr = window.getSelection().toString()
    // if (selectStr) {
    injectPlugin.updateContextmenu(selectStr)
    // }
  })
  const setMatchAddress = () => {
    const bodyStr = jQuery('body').text()
    let addressList = []

    let addressList64 = bodyStr.match(/(0x[a-zA-Z0-9]{64})/g) || []
    let addressList40 = bodyStr.match(/(0x[a-zA-Z0-9]{40})/g) || []
    let addressList80 = []
    addressList64.forEach(item => {
      if (item.lastIndexOf('0x') === 42) {
        addressList40.push(item.slice(0, 42))
      } else {
        addressList80.push(item)
      }

    })
    addressList40.forEach(address40 => {
      let isIn = false
      for (let k = 0; k < addressList80.length; k++) {
        if (addressList80[k].indexOf(address40) > -1) {
          isIn = true;
          break;
        }
      }
      if (!isIn) {
        addressList.push(address40)
      }
    })
    injectPlugin.setMatchAddress(Array.from(new Set(addressList)))
  }
  setTimeout(() => {
    if (!document.hidden) {
      setMatchAddress()
    }
  }, 1000)
  document.addEventListener('visibilitychange', function (e) {
    if (!document.hidden) {
      setTimeout(() => {
        setMatchAddress()
      }, 500)
    }
  })
}

const injectPlugin = {
  init() {
    this._bindInjectPlugin();
    this._bindEventChannel();
    this._bindEvents();
    matchAddress(injectPlugin)

    this.request('init').then((params) => {

    }).catch(err => {
      console.log('Failed to initialise Plugin', err);
    });
  },

  _bindInjectPlugin() {
    const injectPlugin = {}
    injectPlugin.extension = {}; //add a extension object for black list
    injectPlugin.extension.connectMetamask = (address) => {
      this.connectMetamask(address)
    };
    injectPlugin.extension.connectInit = (address) => {
      this.connectInit(address)
    };
    injectPlugin.extension.connectChange = (address) => {
      this.connectChange(address)
    };
    window.injectPlugin = injectPlugin;
  },

  _bindEventChannel() {
    this.eventChannel = new EventChannel('injectPlugin');
    this.request = RequestHandler.init(this.eventChannel);
  },

  _bindEvents() {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (res) => {
        window.injectPlugin.extension.connectChange(res[0])
      })
    }
    this.eventChannel.on('connectWallect', async (type) => {
      try {
        if (!document.hidden) {
          window.injectPlugin.extension.connectInit()
          if (type === 'metamask') {
            if (!window.ethereum) {
              window.injectPlugin.extension.connectMetamask('notinstall')
              return
            }
            window.ethereum.enable()
              .then(res => {
                if (res && res[0]) {
                  window.injectPlugin.extension.connectMetamask(res[0])
                }

              })
          } else {
            if (!window.walletConnectProvider) {
              window.injectPlugin.extension.connectMetamask('notinstall')
              return
            }
            window.walletConnectOn = function (accounts) {
              console.log(accounts)
              window.injectPlugin.extension.connectMetamask(accounts[0])
            }
            await window.walletConnectProvider.activate()

          }

        }
      } catch (e) {
        console.log(e)
        window.injectPlugin.extension.connectMetamask('notinstall')
      }
    })
    this.eventChannel.on('disconnectWallet', async () => {
      if (window.walletConnectProvider) {
        window.walletConnectProvider.deactivate()
        window.localStorage.removeItem('walletconnect')
      }
    })
  },
  connectInit() {
    this.request('connectInit', {

    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  connectMetamask(address) {
    this.request('connectWallet', {
      address
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  connectChange(address) {
    this.request('connectChange', {
      address
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  updateContextmenu(str) {
    this.request('updateContextmenu', {
      str
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  setMatchAddress(addressList) {
    this.request('setMatchAddress', {
      addressList
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }

};

injectPlugin.init();

