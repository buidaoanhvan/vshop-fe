import axios from "axios";
import { message } from "ant-design-vue";
import { authStore } from "../store/index";

export function auth(router) {
  router.beforeEach(async (to, from, next) => {
    const auth = authStore();
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

    if (requiresAuth && !auth.user) {
      next("/login");
    } else if (to.path === "/login" && auth.user) {
      next("/");
    } else {
      next();
    }

    axios.interceptors.response.use(null, (error) => {
      if (error.response.status === 401) {
        auth.logout();
        message.destroy();
        message.warning("Đăng xuất khỏi hệ thông");
        router.push("/login");
      }
      if (error.response.status === 403) {
        message.destroy();
        message.warning("Bạn không có quyền truy cập");
      }
      return Promise.reject(error);
    });

    if (auth.user) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${auth.user.token}`;
    }
  });
}
