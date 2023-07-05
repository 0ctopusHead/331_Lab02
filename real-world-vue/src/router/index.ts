import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListView.vue'
import AboutView from '../views/AboutView.vue'
import MenuView from '../views/MenuView.vue'
import StudentView from '../views/StudentView.vue'
import EventDetailView from '@/views/event/EventDetailView.vue'
import EventEditView from '@/views/event/EventEditView.vue'
import EventRegisterView from "@/views/event/EventRegisterView.vue"
import EventLayoutView from "@/views/event/EventLayoutView.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventListView,
      props: (route) => ({page : parseInt(route.query?.page as string || '1') })
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/menu',
      name: 'menu',
      component: MenuView
    },
    {
      path: '/studentInfo',
      name: 'student-info',
      component: StudentView
    },
    {
      path: '/event/:id/',
      name: 'event-layout',
      component: EventLayoutView,
      props: true,
      children: [
        {
          path: '',
          name: 'event-detail',
          component: EventDetailView,
          props: true
        },
        {
          path: '/event/:id/edit',
          name: 'event-edit',
          component: EventEditView
        },
        {
          path: '/event/:id/register',
          name: 'event-register',
          component: EventRegisterView
        }
      ]

    }
  ]
})

export default router
