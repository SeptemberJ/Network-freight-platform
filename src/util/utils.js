import CryptoJS from 'crypto-js'

export function Encrypt (plaintText) {
  var keyStr = 'btwccy_liubai'
  var key = CryptoJS.enc.Utf8.parse(keyStr)
  var encryptedData = CryptoJS.AES.encrypt(plaintText, key, {
    // iv: iv,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  var encryptedStr = encryptedData.ciphertext.toString()
  return encryptedStr
}

// AES解密
export function Decrypt (encryptedStr) {
  var keyStr = 'btwccy_liubai'
  var key = CryptoJS.enc.Utf8.parse(keyStr)
  var encryptedHexStr = CryptoJS.enc.Hex.parse(encryptedStr)
  var encryptedBase64Str = CryptoJS.enc.Base64.stringify(encryptedHexStr)
  var decryptedData = CryptoJS.AES.decrypt(encryptedBase64Str, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  var decryptedStr = decryptedData.toString(CryptoJS.enc.Utf8)
  return decryptedStr
}

// 创建cookie
export function setCookie (cname, cvalue, exhours) {
  var d = new Date()
  d.setTime(d.getTime() + (exhours * 60 * 60 * 1000))
  var expires = 'expires=' + d.toUTCString()
  document.cookie = cname + '=' + cvalue + '; ' + expires
}

// 获取cookie
export function getCookie (cname) {
  var name = cname + '='
  var ca = document.cookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1)
    if (c.indexOf(name) !== -1) return c.substring(name.length, c.length)
  }
  return ''
}

// 删除cookie
export function clearCookie (name) {
  setCookie(name, '', -1)
}

// 秒数回转
export function secondToFormat (second) {
  var oDate = new Date(second)
  var oYear = oDate.getFullYear()
  var oMonth = oDate.getMonth() + 1
  var oDay = oDate.getDate()
  var oHour = oDate.getHours()
  var oMin = oDate.getMinutes()
  var oSen = oDate.getSeconds()
  // oTime = oYear + '-' + getzf(oMonth) + '-' + getzf(oDay)
  var oTime = oYear + '-' + getzf(oMonth) + '-' + getzf(oDay) + ' ' + getzf(oHour) + ':' + getzf(oMin) + ':' + getzf(oSen)
  return oTime
}

// 时间格式化字符串(传递内容, 需要的格式化类型[Complete, Simple, NotSecond], 年月日分割符号)
export function formatToString (parameter, formatType, splitType) {
  var oDate
  if (typeof parameter === 'object') {
    // 传递的是Date
    oDate = parameter
  } else {
    // 传递的是秒数则转换为Date类型
    oDate = new Date(parameter)
  }
  var oYear = oDate.getFullYear()
  var oMonth = oDate.getMonth() + 1
  var oDay = oDate.getDate()
  var oHour = oDate.getHours()
  var oMin = oDate.getMinutes()
  var oSen = oDate.getSeconds()
  switch (formatType) {
    case 'Complete':
      return (oYear + splitType + getzf(oMonth) + splitType + getzf(oDay) + ' ' + getzf(oHour) + ':' + getzf(oMin) + ':' + getzf(oSen))
      // break
    case 'Simple':
      return (oYear + splitType + getzf(oMonth) + splitType + getzf(oDay))
      // break
    case 'NotSecond':
      return (oYear + splitType + getzf(oMonth) + splitType + getzf(oDay) + ' ' + getzf(oHour) + ':' + getzf(oMin))
      // break
  }
}

// 补零
function getzf (num) {
  if (parseInt(num) < 10) {
    num = '0' + num
  }
  return num
}

export function objDeepCopy (sourceArr) {
  var sourceCopy = sourceArr instanceof Array ? [] : {}
  for (var item in sourceArr) {
    sourceCopy[item] = typeof sourceArr[item] === 'object' ? objDeepCopy(sourceArr[item]) : sourceArr[item]
  }
  return sourceCopy
}

// uuid
export function getuuid () {
  var uid = []
  var hexDigits = 'btwccy_liubai'
  for (var i = 0; i < 32; i++) {
    uid[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  uid[6] = '4'
  uid[15] = hexDigits.substr((uid[15] & 0x3) | 0x8, 1)
  var uuid = uid.join('')
  return uuid
}

// 根据经纬极值计算绽放级别
export function getZoom (maxLng, minLng, maxLat, minLat, map, BMap) {
  var zoom = ['50', '100', '200', '500', '1000', '2000', '5000', '10000', '20000', '25000', '50000', '100000', '200000', '500000', '1000000', '2000000'] // 级别18到3
  var pointA = new BMap.Point(maxLng, maxLat)
  var pointB = new BMap.Point(minLng, minLat)
  var distance = map.getDistance(pointA, pointB).toFixed(1)
  for (var i = 0, zoomLen = zoom.length; i < zoomLen; i++) {
    if (zoom[i] - distance > 0) {
      return 18 - i + 3
    }
  }
}

export function setZoom (points, map, BMap) {
  if (points.length > 0) {
    var maxLng = points[0].lng
    var minLng = points[0].lng
    var maxLat = points[0].lat
    var minLat = points[0].lat
    var res
    for (var i = points.length - 1; i >= 0; i--) {
      res = points[i]
      if (res.lng > maxLng) maxLng = res.lng
      if (res.lng < minLng) minLng = res.lng
      if (res.lat > maxLat) maxLat = res.lat
      if (res.lat < minLat) minLat = res.lat
    }
    var cenLng = (parseFloat(maxLng) + parseFloat(minLng)) / 2
    var cenLat = (parseFloat(maxLat) + parseFloat(minLat)) / 2
    var zoom = getZoom(maxLng, minLng, maxLat, minLat, map, BMap)
    map.centerAndZoom(new BMap.Point(cenLng, cenLat), zoom)
  } else {
    map.centerAndZoom(new BMap.Point(103.388611, 35.563611), 5)
  }
}
