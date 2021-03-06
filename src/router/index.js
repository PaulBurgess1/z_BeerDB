import { createRouter, createWebHistory } from 'vue-router'

import Card from '../views/Card.vue'
import Table from '../views/Table.vue'
import BeerPage from '../views/BeerPage.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
    {
      path: '/',
      name: 'Card',
      component: Card
    },
    {
        path: "/table",
        name: 'Table',
        component: Table
    },
    //Beer Page
    {
      path: "/beer/:id",
      name: 'BeerPage',
      component: BeerPage,
      props: true
    },
    //Redirects
    //404 Page
    {
      path: '/:catchAll(.*)',
      name: "NotFound",
      component: NotFound
    }
  ]
  
  const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  })
  
  export default router