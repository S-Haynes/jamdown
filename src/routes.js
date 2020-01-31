import VueRouter from 'vue-router'
import Home from './pages/Home.vue'
import Music from './pages/Music.vue'
import Discover from './pages/Discover.vue'

const routes = [
  {
    path: '/', 
    component: () =>
    import(/* webpackChunkName: "home" */ "./pages/Home.vue")
  },
  {
    path: '/music', 
    component: () =>
    import(/* webpackChunkName: "music" */ "./pages/Music.vue"),
    children: [
      {
        path: 'discover',
        component: () =>
        import(/* webpackChunkName: "discover" */ "./pages/Discover.vue")
      },
      {
        path: 'search'
      },
      {
        path: 'hot'
      }
    ]
  },
]
const router = new VueRouter({
  mode: 'history',
  routes
})

export default router;