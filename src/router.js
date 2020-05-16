import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import List from './components/Home/list.vue'
import ProductDetail from './components/Home/productDetail.vue'
import User from './views/User.vue'
import Login from './components/User/login'
import Register from './components/User/register'
import Find from './components/User/find'
import Admin from './views/Admin.vue'
import Personal from './views/Personal.vue'
import Order from './components/Admin/order'
import myOrder from './components/Personal/order'
import Car from './components/Personal/car'
import History from './components/Personal/history'
import Commodity from './components/Admin/commodity'
import Category from './components/Admin/category'
import Users from './components/Admin/users'
import User1 from './components/Admin/user1'
import Rank from './components/Admin/rank'
import Address from './components/Personal/address'
import myUser from './components/Personal/user'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/list',
            name: 'list',
            component: List
        },
        {
            path: '/productDetail',
            name: 'productDetail',
            component: ProductDetail
        },

        {
            path: '/user',
            name: 'user',
            component: User,
            children: [
                {
                    path: 'login',
                    name: 'login',
                    component: Login
                },
                {
                    path: 'register',
                    name: 'register',
                    component: Register
                },
                {
                    path: 'find',
                    name: 'find',
                    component: Find
                }
            ]
        },
        {
            path: '/admin',
            name: 'admin',
            component: Admin,
            children: [
                {
                    path: '',
                    name: 'users',
                    redirect:'/admin/users'//设置默认的界面
                },
                {
                    path: 'users',
                    name: 'users',
                    component: Users
                },
                {
                    path: 'user1',
                    name: 'user1',
                    component: User1
                },
                {
                    path: 'order',
                    name: 'order',
                    component: Order
                },
                {
                    path: 'commodity',
                    name: 'commodity',
                    component: Commodity
                },
                {
                    path: 'category',
                    name: 'category',
                    component: Category
                },
                {
                    path: 'rank',
                    name: 'rank',
                    component: Rank
                }
            ]
        },
        {
            path: '/personal',
            name: 'personal',
            component: Personal,
            children: [
                {
                    path: '',
                    name: 'user',
                    redirect:'/personal/user'//设置默认的界面
                },

                {
                    path: 'user',
                    name: 'myUser',
                    component: myUser
                },
                {
                    path: 'car',
                    name: 'car',
                    component: Car
                },
                {
                    path: 'order',
                    name: 'myOrder',
                    component: myOrder
                },
                {
                    path: 'address',
                    name: 'address',
                    component: Address
                },
                {
                    path: 'history',
                    name: 'history',
                    component: History
                }
            ]
        }
    ]
})
