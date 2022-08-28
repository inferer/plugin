import { PopupAPI } from '../../api';
import MessageDuplex from '../../MessageDuplex'


import { initDom } from './modules/insertDom'

const duplex = new MessageDuplex.Popup()

PopupAPI.init(duplex)

document.addEventListener('selectionchange', function (e) {
  const selectStr = window.getSelection().toString()
  if (selectStr) {
    PopupAPI.updateContextmenu(selectStr)
  }
})

initDom()
// document.addEventListener('contextmenu', function (e) {
//   setTimeout(() => {
//     // console.log(window.getSelection().toString())
    

//   }, 100)
// })

