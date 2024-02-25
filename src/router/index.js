import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../views/FrontLayout.vue'),
      children:[  
        {
          path: '/',
          component: () => import('../views/FrontHomeView.vue')
        },      
        {
          path: 'products',
          component: () => import('../views/ProductsView.vue')
        }, 
        {
          path: 'cart',
          component: () => import('../views/CartView.vue')
        },
         {
          path: 'login',
          component: () => import('../views/LoginView.vue')
        },
      ],
    },
    {
      path: '/admin',
      component: () => import('../views/dashboard/DashboardLayout.vue'), 
      children:[
        {
          path: '',
          component: () => import('../views/dashboard/AdminHome.vue')
        },
        {
          path: 'products',
          component: () => import('../views/dashboard/AdminProduct.vue')
        },
        {
          path: 'orders',
          component: () => import('../views/dashboard/AdminOrders.vue')
        },
      ]
    },
  ]
})

export default router
