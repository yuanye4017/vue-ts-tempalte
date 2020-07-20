import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Layout from "@/layout/index.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/redirect/:path(.*)",
    name: "edirect",
    component: () => import("@/views/redirect/index.vue")
  },
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "home",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/home/index.vue"),
        name: "Home",
        meta: {
          title: "首页"
        }
      }
    ]
  },
  {
    path: "/",
    component: Layout,
    redirect: "/follow",
    children: [
      {
        path: "follow",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/follow/index.vue"),
        name: "Follow",
        meta: {
          title: "关注"
        }
      }
    ]
  },
  {
    path: "/",
    component: Layout,
    redirect: "/my",
    children: [
      {
        path: "my",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/my/index.vue"),
        name: "My",
        meta: {
          title: "我的"
        }
      }
    ]
  },
  {
    path: "/login",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/login/index.vue")
  },
  {
    path: "*",
    component: () =>
      import(/* webpackChunkName: "404" */ "@/views/error-page/404.vue")
  }
];
const createRouter = () =>
  new VueRouter({
    mode: "history",
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition;
      } else {
        return { x: 0, y: 0 };
      }
    },
    base: process.env.BASE_URL,
    routes: routes
  });

const router = createRouter();

export default router;
