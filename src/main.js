import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import { auth } from "./services/auth";
import { http } from "./services/http";
import { createPinia } from "pinia";
import dayjs from "dayjs";

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(Antd);

const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
app.config.globalProperties.$dayjs = dayjs;

auth(router);
http();

app.mount("#app");
