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
            path: "article",
            name: "article",
            component: () => import('../views/contents/userArticle')
          },
          {
            path: "showArticle",
            name: "showArticle",
            component: () => import('../views/contents/showArticle')
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
        path: "addArticle",
        name: "addArticle",
        component: () => import('../components/addArticle')
      }
    ]
  }

]

const router = new VueRouter({
  routes,
  mode: 'history',

})

//捕获到loading chunk failed的错误的时候重新渲染目标页面
router.onError(err => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = err.message.match(pattern);
  if (isChunkLoadFailed) {
    const targetPath = router.history.pending.fullPath;
    router.replace(targetPath);
  }

})
export default router
