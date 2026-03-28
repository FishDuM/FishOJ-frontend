import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import NoAuthView from "@/views/NoAuthView.vue";
import UserLayout from "@/layouts/UserLayout.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import AddQuestionView from "@/views/question/AddQuestionView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "用户布局",
    component: UserLayout,
    meta: {
      hideInMenu: true,
    },
    children: [
      {
        path: "/user/login",
        name: "用户登录",
        component: UserLoginView,
      },
      {
        path: "/user/register",
        name: "用户注册",
        component: UserRegisterView,
      },
    ],
  },
  {
    path: "/",
    name: "主页",
    component: HomeView,
  },
  {
    path: "/admin/add_question",
    name: "添加题目",
    component: AddQuestionView,
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
