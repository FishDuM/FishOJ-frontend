import accessEnum from "@/access/accessEnum";

/**
 * 检查权限
 * @param userRole 用户的权限
 * @param needAccess 需要的权限
 */
const checkAccess = (userRole: string, needAccess = accessEnum.NOT_LOGIN) => {
  if (needAccess === accessEnum.NOT_LOGIN) {
    return true;
  } else if (userRole === accessEnum.ADMIN) {
    return true;
  } else {
    return userRole === needAccess;
  }
};

export default checkAccess;
