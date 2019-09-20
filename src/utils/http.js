const host = process.env.API_BASE_URL
function request (url, method, data, header) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: host + url,
      method: method,
      data: data,
      header: header,
      success: function (res) {
        if (res.data.error) {
          reject(res.data.status)
          return
        }
        resolve(res.data)
      },
      fail: function (res) {
        reject(res)
      }
    })
  })
}
function get (obj) {
  return request(obj.url, 'GET', obj.data, {'content-Type': 'application/json;charset=utf-8'})
}

function post (obj) {
  return request(obj.url, 'POST', obj.data, {'content-Type': 'application/x-www-form-urlencoded'})
}

export default {
  get,
  post
}
