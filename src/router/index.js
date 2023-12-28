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
        },
        {
            path: '/pdf',
            name: 'pdf',
            component: () => import('../views/pdf.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/login.vue')
        }
    ]
})
 
export default router