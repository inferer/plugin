import jQuery from '../../../assets/js/jquery-3.6.0.min.js';
const $ = jQuery;

export const initDom = () => {
  insertRoot();
}

export const insertRoot = () => {
  setTimeout(() => {
    const bodyStr = $('body').text()
    console.log(bodyStr.match(/(0x[a-zA-Z0-9]{40})/g))
  }, 1000)

}