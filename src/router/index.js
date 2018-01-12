import Vue from 'vue'
import Router from 'vue-router'
import meeting from '@/components/meeting/meeting'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: meeting
    }
  ]
})
