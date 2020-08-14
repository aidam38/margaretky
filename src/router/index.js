import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Intro from '../views/Intro.vue'
import Margarita from '../views/Margarita.vue'
import People from '../views/People.vue'
import AddPeople from '../views/AddPeople.vue'
import AdminPanel from '../views/AdminPanel.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Intro',
        component: Intro
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/dopis',
        name: 'Margarita',
        props: true,
        component: Margarita
    },
    {
        path: '/lidi',
        name: 'People',
        props: true,
        component: People
    },
    {
        path: '/pridat-cloveka',
        name: "AddPeople",
        component: AddPeople
    },
    {
        path: '/admin-panel',
        name: "AdminPanel",
        component: AdminPanel
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
