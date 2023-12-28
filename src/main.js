import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
// 引入路由第三方包
import router from './router'
import 'element-ui/lib/theme-chalk/display.css';

import Chat from 'vue-beautiful-chat'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(Chat)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
