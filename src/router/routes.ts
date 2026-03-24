import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AdminView from "@/views/AdminView.vue";
import NoAuthView from "@/views/NoAuthView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "主页",
    component: HomeView,
  },
  {
    path: "/admin",
    name: "管理员可见",
    component: AdminView,
    meta: {
      success: "admin",
    },
  },
  {
    path: "/about",
    name: "我的",
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/404",
    name: "404页面",
    component: NoAuthView,
    meta: {
      hideInMenu: true,
    },
  },
];
