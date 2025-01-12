import { createRouter, createWebHistory } from 'vue-router'
import ReportComponent from '../components/controlPanelComponents/ReportComponents.vue';

import SesionView from '../views/LoginViews/SesionView.vue'
import MainLayout from '../components/LayoutComponents/MainLayout.vue'
import MenuView from '../views/LoginViews/MenuView.vue'
import CartView from '@/views/LoginViews/CartView.vue'
import TicketsView from '../views/LoginViews/TicketsView.vue'
import ChatView from '../views/LoginViews/ChatView.vue'
import CreateTicketView from '../views/LoginViews/CreateTicketView.vue'
import UpdateTicket from '@/components/TicketsComponents/UpdateTicket.vue'
import sellerDashboard from '@/views/LoginViews/sellerDashboard.vue'
import ProductList from '@/components/MenuComponents/ListOfProducts&ProductDetails/ProductList.vue';
import AdminTicket from '@/components/TicketsComponents/AdminTicket.vue';
import CheckOut from '@/components/CartComponents/CheckOut.vue';
import ReturnPanelView from '@/views/LoginViews/ReturnPanelView.vue';
import ReturnAdminPanelView from '@/views/LoginViews/ReturnAdminPanelView.vue';
import ReturnRequestView from '@/views/LoginViews/ReturnRequestView.vue';
import ReturnAdminNotes from '@/components/ReturnComponents/ReturnAdminNotes.vue';
import ReviewRatingsView from '@/views/LoginViews/ReviewRatingsView.vue';
import WriteReviewView from '@/views/LoginViews/WriteReviewView.vue';
import OrdersList from '@/components/OrderComponents/OrdersList.vue';
import TrendingList from '@/components/MenuComponents/ListOfProducts&ProductDetails/TrendingList.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    
    
    {
      path: '/tickets',
      name: 'Tickets',
      component: TicketsView
    },
      {
        
        path: '/',
        name: 'sesion', 
        component: SesionView
      },
      {
        path: '/Main',
        component: MainLayout,
        children: [
          {
            path: '/products',
            name: 'ProductList',
            component: ProductList
          },
          {
            path: '/Menu',
            name: 'Menu',
            component: MenuView
          }, 
          {
            path: '/Carrito',
            name: 'Carrito',
            component: CartView
          },
          {
            path: '/Checkout',
            name: 'Checkout',
            component: CheckOut
          },
          {
            path: '/tickets',
            name: 'Tickets',
            component: TicketsView
          },
          {
            path: '/return-panel',
            name: 'ReturnPanel',
            component: ReturnPanelView
          },
          {
            path: '/return-admin-panel',
            name: 'ReturnAdminPanel',
            component: ReturnAdminPanelView
          },
          {
            path: '/return-request/:orderId',
            name: 'ReturnRequestView',
            component: ReturnRequestView,
            props: true
          },
          {
            path: '/return-admin-notes/:returnId',
            name: 'ReturnAdminNotes',
            component: ReturnAdminNotes,
            props: true
          },

          {
            path: '/create-ticket',
            name: 'CreateTicket',
            component: CreateTicketView
          },
          {
            path: '/update-ticket/:id',
            name: 'UpdateTicket',
            component: UpdateTicket,
            props: true
          },
          {
            path: '/admin-tickets',
            name: 'AdminTicket',
            component: AdminTicket
          },
          { 
            path: '/reviews-write', 
            name: 'WriteReview', 
            component: WriteReviewView, 
          },
          {
            path: '/reviewsrating',
            name: 'ReviewsRating',
            component: ReviewRatingsView,
          },
          {
            path: '/orders',
            name: 'OrdersList',
            component: OrdersList,
          },
          {
            path: '/product-reviews/:id',
            name: 'ProductReviews',
            component: ReviewRatingsView,
            props: true
          }
        ],
        
      },
     
      {
        path: '/chat',
        name: 'Chat',
        component: ChatView
      },
      {
            path: '/sellerDashboard', 
            name: 'sellerDashboard', 
            component: sellerDashboard
      },
    {

      path: '/',
      name: 'sesion',
      component: SesionView
    },
    {
      path: '/Main',
      component: MainLayout,
      children: [
        {
          path: '/products',
          name: 'ProductList',
          component: ProductList
        },
        {
          path: '/trending',
          name: 'trending',
          component: TrendingList
        },
       
        {
          path: '/Menu',
          name: 'Menu',
          component: MenuView
        },
        {
          path: '/Carrito',
          name: 'Carrito',
          component: CartView
        },
        {
          path: '/tickets',
          name: 'Tickets',
          component: TicketsView
        },
        {
          path: '/create-ticket',
          name: 'CreateTicket',
          component: CreateTicketView
        },
        {
          path: '/update-ticket/:id',
          name: 'UpdateTicket',
          component: UpdateTicket,
          props: true
        },
        {
          path: '/admin-tickets',
          name: 'AdminTicket',
          component: AdminTicket
        },
      ],

    },

    {
      path: '/chat',
      name: 'Chat',
      component: ChatView
    },
    {
      path: '/sellerDashboard',
      name: 'sellerDashboard',
      component: sellerDashboard
    },
    {
      path: '/report/:storeId',
      name: 'ReportComponent',
      component: ReportComponent,
      props: true,
    },
   
  
  ]
})

export default router
