import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index.vue'
 
Vue.use(VueRouter)
 
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'index',
            component: index
        },
        {
            path: '/analysis',
            name: 'analysis',
            component: () => import('../views/analysis.vue')
        }
    ]
})
 
export default router