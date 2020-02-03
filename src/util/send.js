import axios from 'axios'
import {getCookie, clearCookie} from './utils'
import { Message } from 'element-ui'
import store from '../vuex/store'

const URL_PREFIX = 'http://120.27.3.205/yingsu/rest'

export function send (options) {
  if (!options.name) {
    throw new Error('没有指定接口名称')
  }
  const timestamp = Date.now()
  // options.url = (URL_PREFIX + options.name).indexOf('?') === -1 ? (URL_PREFIX + options.name + '?timestamp=' + timestamp) : (URL_PREFIX + options.name + '&timestamp=' + timestamp)
  options.url = URL_PREFIX + options.name
  delete options.name
  return new Promise(function (resolve, reject) {
    switch (options.method) {
      case 'POST':
        axios.post(encodeURI(options.url), options.data,
          {
            headers: {
              'X-AUTH-TOKEN': getCookie('btwccy_cookie') || '',
              'X-Timestamp': timestamp
            }
          }
        ).then((res) => {
          resolve(res)
        }).catch((error) => {
          Message.error({
            message: 'Interface error!'
          })
          console.log(error)
          resolve(error)
          throw new Error('接口报错！')
        })
        break
      case 'GET':
        axios.get(encodeURI(options.url), {headers: {'X-Timestamp': timestamp, 'X-AUTH-TOKEN': getCookie('btwccy_cookie')}}
        ).then((res) => {
          resolve(res)
        }).catch((error) => {
          console.log(error.response.status)
          if (error.response.status === 401) {
            store.dispatch('changeRouter')
            store.dispatch('changeLocationIdx', 0)
            store.dispatch('changeSiderIdx', '1-1')
            clearCookie('btwccy_cookie')
            Message.error({
              message: 'Token已过期请重新登陆！'
            })
          } else {
            Message.error({
              message: 'Interface error!'
            })
          }
        })
        break
      case 'DELETE':
        axios.delete(encodeURI(options.url),
          {
            headers: {
              'X-AUTH-TOKEN': getCookie('btwccy_cookie') || '',
              'X-Timestamp': timestamp
            }
          }
        ).then((res) => {
          resolve(res)
        }).catch((error) => {
          console.log(error)
          Message.error({
            message: 'Interface error!'
          })
        })
        break
      case 'PUT':
        axios.put(encodeURI(options.url), options.data,
          {
            headers: {
              'X-AUTH-TOKEN': getCookie('btwccy_cookie') || '',
              'X-Timestamp': timestamp
            }
          }
        ).then((res) => {
          resolve(res)
        }).catch((error) => {
          console.log(error)
          Message.error({
            message: 'Interface error!'
          })
        })
        break
    }
  })
}
