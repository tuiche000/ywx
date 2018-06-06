import axios from 'axios'
import qs from 'qs'

// 拦截器
axios.interceptors.request.use(function (config) {
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  if (config.method === 'post') {
    config.data = qs.stringify({
      ...config.data
    })
  }
  return config
}, function (error) {
  // loadinginstace.close()
  return Promise.reject(error)
})
// axios.post('http://xxxxx.com',qs.stringify({name:'test'})).then(re=>{
//   qs.stringify(params})
//   console.log(re)
// })
axios.defaults.timeout = 5000
axios.defaults.baseURL = 'http://jk.yiwangxian.com/api'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www=form-urlencoded'
export default {
  fetchGet (url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.get(url, params).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchPost (url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, params).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  }
  // fetchPost (url, params = {}) {
  //   return new Promise((resolve, reject) => {
  //     axios.post(url, qs.stringify(params)).then(res => {
  //       resolve(res.data)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // }
}
