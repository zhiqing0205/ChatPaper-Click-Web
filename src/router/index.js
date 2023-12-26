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
        // {
        //     path: '/hello',
        //     name: 'hello',
        //     component: () => import('../views/hello.vue')
        // }
    ]
})
 
export default router