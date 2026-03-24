import accessEnum from "@/access/accessEnum";

/**
 * 检查权限
 * @param role 用户的权限
 * @param needAccess 需要的权限
 */
const checkAccess = (role: string, needAccess = accessEnum.NOT_LOGIN) => {
  if (needAccess === accessEnum.NOT_LOGIN) {
    return true;
  } else if (role === accessEnum.ADMIN) {
    return true;
  } else {
    return role === needAccess;
  }
};

export default checkAccess;
