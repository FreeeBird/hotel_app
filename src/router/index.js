import Vue from 'vue'
import Router from 'vue-router'
import IndexLayout from '@/components/IndexLayout'
import IndexPage from '@/components/IndexPage'
import Login from '@/components/Login'
import page404 from '@/components/404'
import Room from "@/components/Room"
import MyProfile from '@/components/MyProfile'
import Order from '@/components/Order'
import MakeOrder from "@/components/MakeOrder";
import OrderDetail from "@/components/OrderDetail";

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/login', name: 'Login', component: Login },
    { path: '/404', name: '404', component: page404 },
    {
      path: '/',
      redirect: '/index',
      component: IndexLayout,
      children: [
        { path: '', name: 'Index', component: IndexPage },
        { path: '/room', name: 'Room', component: Room },
        { path: '/myProfile', name: 'MyProfile', component: MyProfile },
        { path: '/order', name: 'Order', component: Order },
        { path: '/orderDetail', name: 'OrderDetail', component: OrderDetail },
        { path: '/makeOrder', name: 'MakeOrder', component: MakeOrder },
      ]
    },
    { path: '*', redirect: '/404', hidden: true }
  ]
})
