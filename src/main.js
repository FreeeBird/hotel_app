// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import router from './router'
import Toast from 'muse-ui-toast'
import Loading from 'muse-ui-loading'
import 'muse-ui-loading/dist/muse-ui-loading.css'
import vFilter from '@/utils/myFilter' // 引入全局过滤器
import Cookies from 'js-cookie'




const toastConfig = {
  position: 'bottom-start',               // 弹出的位置
  time: 2000,                       // 显示的时长
  closeIcon: 'close',               // 关闭的图标
  close: true,                      // 是否显示关闭按钮
  successIcon: 'check_circle',      // 成功信息图标
  infoIcon: 'info',                 // 信息信息图标
  warningIcon: 'priority_high',     // 提醒信息图标
  errorIcon: 'warning'
}

Vue.use(Loading);
Vue.config.productionTip = false
Vue.use(MuseUI)
Vue.use(Toast,toastConfig)

Vue.prototype.isLogin = function () {
  const username = Cookies.get("username")
  if (username == null || username === '') {
    return false;
  }
  else {
    return true
  }
}

for (let key in vFilter){
  Vue.filter(key,vFilter[key])
}



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
