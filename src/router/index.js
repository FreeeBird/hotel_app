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
import Register from "@/components/Register";
import Cookie from 'js-cookie'
import Toast from 'muse-ui-toast';
Vue.use(Router)

const route = new Router({
  routes: [
    { path: '/register', name: 'Register', component: Register },
    { path: '/login', name: 'Login', component: Login },
    { path: '/404', name: '404', component: page404 },
    {
      path: '/',
      redirect: '/index',
      component: IndexLayout,
      children: [
        { path: '', name: 'Index', component: IndexPage },
        { path: '/room', name: 'Room', component: Room },
        { path: '/myProfile', name: 'MyProfile', component: MyProfile,meta: {requireAuth: true,} },
        { path: '/order', name: 'Order', component: Order,meta: {requireAuth: true,} },
        { path: '/orderDetail', name: 'OrderDetail', component: OrderDetail ,meta: {requireAuth: true,}},
        { path: '/makeOrder', name: 'MakeOrder', component: MakeOrder ,meta: {requireAuth: true,}},
      ]
    },
    { path: '*', redirect: '/404', hidden: true }
  ]
})

route.beforeEach((to,from,next)=>{
  if(to.matched.some((r)=> r.meta.requireAuth )){
    if(Cookie.get('user_id')){
      next();
    }else{
      Toast.warning("请先登录");
      next({
        path:'/login',
        query:{redirect: to.fullPath}
      });
    }
  }else next();
});

export default route
