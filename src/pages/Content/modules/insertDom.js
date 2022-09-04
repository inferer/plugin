import jQuery from '../../../assets/js/jquery-3.6.0.min.js';
const $ = jQuery;

export const initDom = () => {
  insertRoot();
}

export const insertRoot = () => {

  const injectionSite = (document.head || document.documentElement);
  const container = document.createElement('script');

  container.src = chrome.runtime.getURL('injectPlugin.bundle.js');
  container.onload = function () {
    this.parentNode.removeChild(this);
  };

  injectionSite.insertBefore(
    container,
    injectionSite.children[0]
  );
}

export const matchAddress = () => {
  setTimeout(() => {
    const bodyStr = $('body').text()
    console.log(bodyStr.match(/(0x[a-zA-Z0-9]{40})/g))
  }, 1000)
}