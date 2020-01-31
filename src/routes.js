import VueRouter from 'vue-router'
import Home from './pages/Home.vue'
import Music from './pages/Music.vue'
import Discover from './pages/Discover.vue'

const routes = [
  {
    path: '/', 
    component: Home
  },
  {
    path: '/music', 
    component: Music,
    children: [
      {
        path: 'discover',
        component: Discover
      }
    ]
  },
]
const router = new VueRouter({
  mode: 'history',
  routes
})

export default router;