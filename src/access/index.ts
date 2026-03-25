import "@/access/accessEnum";
import accessEnum from "@/access/accessEnum";
import router from "@/router";
import store from "@/store/index";
import checkAccess from "@/access/checkAccess";

router.beforeEach(async (to, from, next) => {
  const user = store.state.user.loginUser;
  if (!user || !user.userRole) {
    await store.dispatch("user/getLoginUser");
  }

  const needAccess = to.meta?.success ?? accessEnum.NOT_LOGIN;

  if (needAccess !== accessEnum.NOT_LOGIN) {
    if (!user.loginUser || !user.loginUser.userRole) {
      next(`/user/login?redirect=${to.fullPath}`);
      return;
    }
    if (to.meta?.success === accessEnum.ADMIN) {
      // 仅管理员可见判断
      if (store.state.user.loginUser.userRole !== accessEnum.ADMIN) {
        next("/404");
        return;
      }
    }
    if (checkAccess(user.userRole, needAccess)) {
      next("/404");
      return;
    }
  }

  next();
});
