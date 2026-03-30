import { createStore } from "vuex";
import user from "./user";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    user,
  },
  // 持久化配置（刷新不丢失）
  plugins: [
    createPersistedState({
      key: "vuex-store", // 存储在 localStorage 里的 key 名称
      paths: ["user"], // 只持久化 user 模块
    }),
  ],
});
