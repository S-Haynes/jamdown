import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './App.vue'
import router from './routes'
import fontAwesomeConfig from './config/fontawesome'
import { store } from './store/store'
import VueProgressiveImage from 'vue-progressive-image'

Vue.use(VueProgressiveImage, {
  delay: 500
})
Vue.use(VueRouter)
Vue.use(Vuex)
fontAwesomeConfig();

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
