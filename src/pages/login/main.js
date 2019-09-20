import Vue from 'vue'
import App from './index'
import http from '../../utils/http'

// add this to handle exception
Vue.config.errorHandler = function (err) {
  if (console && console.error) {
    console.error(err)
  }
}
Vue.prototype.$http = http
const app = new Vue(App)
app.$mount()
