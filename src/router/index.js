import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import(/* webpackChunkName: "Home" */ '../components/login.vue')
const Regiest = () => import(/* webpackChunkName: "Home" */ '../components/Regiest.vue')
const MangerHome = () => import(/* webpackChunkName: "Manager" */ '../components/Manager/home.vue')
const UserList = () => import(/* webpackChunkName: "Manager" */ '../components/Manager/userList.vue')
const CarList = () => import(/* webpackChunkName: "Manager" */ '../components/Manager/carList.vue')
const CarType = () => import(/* webpackChunkName: "Manager" */ '../components/Manager/type.vue')
const OrderList = () => import(/* webpackChunkName: "Manager" */ '../components/Manager/Orderlist.vue')
const UserHome = () => import(/* webpackChunkName: "Manager" */ '../components/User/home.vue')
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/regiest', component: Regiest },
  {
    path: '/mangerHome',
    component: MangerHome,
    children: [
      { path: '/userList', component: UserList },
      { path: '/CarList', component: CarList },
      { path: '/CarType', component: CarType },
      { path: '/OrderList', component: OrderList }
    ]
  },
  {
    path: '/home',
    component: UserHome
  }
]

const router = new VueRouter({
  routes
})
// 设置路由守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  if (to.path === '/regiest') return next()
  if (from.path === '/login' && to.path === '/regiest') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
