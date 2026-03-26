// initial state
import { StoreOptions } from "vuex";
import { UserControllerService } from "../../generated";

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userName: "未登录",
    },
  }),
  actions: {
    async getLoginUser({ commit, state }, payload) {
      const res = await UserControllerService.getLoginUserUsingGet();
      if (res.code === 0 && res.data?.id) {
        commit("updateUser");
      } else {
        commit("updateUser", {
          ...state.loginUser,
          userRole: "NoLogin",
        });
      }
      commit("updateUser", payload);
    },
  },
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
