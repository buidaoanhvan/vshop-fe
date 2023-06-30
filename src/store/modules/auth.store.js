import { defineStore } from "pinia";
import Axios from "axios";
import api_link from "@/configs/api";
import { message } from "ant-design-vue";
import router from "../../router/index";

export const authStore = defineStore({
  id: "auth",
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")),
  }),

  actions: {
    async login(email, password) {
      try {
        const res = await Axios.post(api_link.login, { email, password });
        if (res.data.code == 200) {
          res.data.user.token = res.data.accessToken;
          this.user = res.data.user;
          localStorage.setItem("user", JSON.stringify(res.data.user));
          router.push("/");
        } else {
          message.warning(res.data.message);
        }
      } catch (error) {
        message.error("Vui lòng thử lại sau");
      }
    },
    logout() {
      this.user = null;
      localStorage.removeItem("user");
      router.push("/login");
    },
  },
});
