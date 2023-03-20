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

export const numMonth: any = {
  '01': 'Jan',
  '02': 'Feb',
  '03': 'Mar',
  '04': 'Apr',
  '05': 'May',
  '06': 'Jun',
  '07': 'Jul',
  '08': 'Aug',
  '09': 'Sep',
  '10': 'Oct',
  '11': 'Nov',
  '12': 'Dec',
}

export function num2Month(num: string) {
  return numMonth[num]
}

export function formatNumber(num: number) {
  return num >= 1e3 && num < 1e4 ? (num / 1e3).toFixed(1) + 'k' : num >= 1e4 ? (num / 1e4).toFixed(1) + 'w' : num
}
