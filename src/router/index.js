import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import HomeViewVue from "@/views/HomeView.vue";
import UserViewVue from "../views/UserView.vue";
import BrandView from "@/views/BrandView.vue";
import SupplierView from "@/views/SupplierView.vue";
import VoucherView from "../views/VoucherView.vue";
import PathNotFound from "../views/PathNotFound.vue";
import SegmentView from "../views/SegmentView.vue";
import SegmentRequestView from "../views/SegmentRequestView.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: { requiresAuth: false },
  },
  {
    path: "/",
    name: "tongquan",
    component: HomeViewVue,
    meta: { requiresAuth: true },
  },
  {
    path: "/nguoidung",
    name: "nguoidung",
    component: UserViewVue,
    meta: { requiresAuth: true },
  },
  {
    path: "/thuonghieu",
    name: "thuonghieu",
    component: BrandView,
    meta: { requiresAuth: true },
  },
  {
    path: "/doitac",
    name: "doitac",
    component: SupplierView,
    meta: { requiresAuth: true },
  },
  {
    path: "/voucher",
    name: "voucher",
    component: VoucherView,
    meta: { requiresAuth: true },
  },
  {
    path: "/layvoucher",
    name: "layvoucher",
    component: SegmentView,
    meta: { requiresAuth: true },
  },
  {
    path: "/yeucau",
    name: "yeucau",
    component: SegmentRequestView,
    meta: { requiresAuth: true },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "found",
    component: PathNotFound,
    meta: { requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
