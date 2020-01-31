import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './App.vue'
import router from './routes'
import fontAwesomeConfig from './config/fontawesome'
import { store } from './store/store'

Vue.use(VueRouter)
Vue.use(Vuex)
fontAwesomeConfig();

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
