import jQuery from '../../../assets/js/jquery-3.6.0.min.js';
const $ = jQuery;

export const initDom = (PopupAPI) => {
  matchAddress(PopupAPI);
}

export const insertRoot = () => {

}

export const matchAddress = (PopupAPI) => {

  setTimeout(() => {
    const bodyStr = $('body').text()
    const addressList = bodyStr.match(/(0x[a-zA-Z0-9]{40})/g)
    console.log(addressList)
    PopupAPI.matchAddress(addressList)
  }, 5000)
}