import { API_URL } from '../Popup/config/constants';

export function fetcher(url, data) {
  let fetchUrl = API_URL + url
  if (data) {
    let paramsArr = []
    Object.keys(data).forEach(key => paramsArr.push(key + '=' + data[key]))
    fetchUrl += '?' + paramsArr.join('&')
  }
  return fetch(fetchUrl)
    .then(res => res.json())
}

export function poster(url, data, options = {}) {
  return fetch(API_URL + url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(res => res.json())
}
