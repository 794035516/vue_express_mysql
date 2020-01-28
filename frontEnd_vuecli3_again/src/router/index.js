import Vue from 'vue'
import VueRouter from 'vue-router'
//登陆页面
import login from '../views/login.vue'
//主页面
import main from '../views/main.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/main',
    name: 'main',
    component: main,
    redirect: "/main/user_contents",
    children: [
      {
        path: "user_contents",
        name: "user_contents",
        component: () => import('../views/contents'),
        children: [
          {
            path: "lesson",
            name: "lesson",
            component: () => import('../views/contents/userLesson'),
          },
          {
            path: "echarts",
            name: "echarts",
            component: () => import('../views/contents/userEcharts')
          },
          {
            path: "store",
            name: "store",
            component: () => import('../views/contents/userStore')
          },
          {
            path:"article",
            name:"article",
            component: () => import('../views/contents/userArticle')
          }
        ]
      },
      {
        path: "show",
        name: "show",
        component: () => import("../views/main_content/show"),
      },
      {
        path: "lesson",
        name: "lesson",
        component: () => import("../views/main_content/lesson")
      },
      {
        path:"addArticle",
        name:"addArticle",
        component:()=>import('../components/addArticle')
      }
    ]
  }

]

const router = new VueRouter({
  routes,
  mode: 'history',

})

export default router
