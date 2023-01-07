import { createApp } from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import App from './App.vue'
import Calendar from './components/Calendar.vue'
import Confirmation from './components/Confirmation.vue'
import Edit from './components/Edit.vue'
import Email from './components/Email.vue'
import Home from './components/Home.vue'
import ScheduleBoard from './components/ScheduleBoard.vue'

console.log(Home)

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes :[
        {
            name:'Home',
            path:'/',
            component: Home
        },
        {
            name:'Calendar',
            path:'/Calendar',
            component: Calendar,
            props:true
        },
        {
            name:'Confirmation',
            path:'/Confirmation',
            component: Confirmation,
            props:true
        },
        {
            name:'Edit',
            path:'/Edit',
            component: Edit,
            props:true
        },
        {
            name:'Email',
            path:'/Email',
            component: Email,
            props:true
        },
        {
            name:'ScheduleBoard',
            path:'/ScheduleBoard',
            component: ScheduleBoard,
            props:true
        }
    ]
})
createApp(App).use(router).mount('#app');
