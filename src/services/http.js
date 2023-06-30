import axios from "axios";
import { loadingStore } from "../store/index";
import { message } from "ant-design-vue";

export function http() {
  const loading = loadingStore();
  axios.interceptors.request.use((config) => {
    message.destroy();
    loading.loadingTrue();
    return config;
  });

  axios.interceptors.response.use((response) => {
    message.destroy();
    loading.loadingFalse();
    return response;
  });

  axios.interceptors.response.use(null, (error) => {
    message.destroy();
    loading.loadingFalse();
    return Promise.reject(error);
  });
}
