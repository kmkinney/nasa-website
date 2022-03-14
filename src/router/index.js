import Vue from 'vue'
import VueRouter from 'vue-router'
import DateView from '../views/DateView.vue'
import DetailView from '../views/DetailView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'date',
    component: DateView
  },
  {
      path: '/details/:id',
      name: 'details',
      component: DetailView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
