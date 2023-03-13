export function addZero(m: number) {
  return m < 10 ? '0' + m : m;
}
export function transformTime(timestamp: number) {
  var time = new Date(timestamp);
  var y = time.getFullYear();
  var M = time.getMonth() + 1;
  var d = time.getDate();
  var h = time.getHours();
  var m = time.getMinutes();
  var s = time.getSeconds();

  return addZero(h) + ':' + addZero(m) + ' ' + addZero(M) + "/" + addZero(d) + ' ' + y;
}

export function randomString() {
  return Math.random().toString(36).slice(-10);
}

export function formatAddress(address: string = '') {
  return address.slice(0, 4) + '...' + address.slice(-4)
}