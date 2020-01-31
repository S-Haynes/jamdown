import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './App.vue'
import router from './routes'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faPlay, faPause, faFastBackward, faFastForward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret)
library.add(faPlay)
library.add(faPause)
library.add(faFastBackward)
library.add(faFastForward)

Vue.component('font-awesome-icon', FontAwesomeIcon)

import { store } from './store/store'

Vue.use(VueRouter)
Vue.use(Vuex)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
