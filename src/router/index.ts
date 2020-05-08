import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import { getTodoById } from '../core/api/index'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/edit/:id',
    name: 'TodoEdit',
    component: () => import('../views/TodoEdit.vue'),
    beforeEnter: async (to, from, next) => {
      const { id } = to.params
      const todo = await getTodoById(id)
      if (todo) next()
      else next('/')
    }
  },
  {
    path: '/add',
    name: 'TodoAdd',
    component: () => import('../views/TodoAdd.vue')
  },
  {
    path: '**',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
