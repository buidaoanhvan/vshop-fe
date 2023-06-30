<template>
  <LoadingVue></LoadingVue>
  <a-layout>
    <a-layout-sider
      v-if="$route.name != 'login' && $route.name != 'found'"
      breakpoint="lg"
      collapsed-width="0"
      style="height: 100vh"
    >
      <div class="logo"></div>
      <a-menu
        theme="dark"
        mode="inline"
        :selectedKeys="[`${this.$route.name}`]"
      >
        <router-link
          v-for="route in menu"
          :key="route.key"
          :to="{ name: route.routerName }"
        >
          <a-menu-item :key="route.key">
            <component v-bind:is="route.icon"></component>
            <span class="nav-text">{{ route.title }}</span>
          </a-menu-item>
        </router-link>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header
        v-if="$route.name != 'login' && $route.name != 'found'"
        :style="{ background: '#fff', padding: 0 }"
        class="header"
      >
        <a-dropdown>
          <a-avatar>{{ user?.fullname?.charAt(0) }}</a-avatar>

          <template #overlay>
            <a-menu>
              <a-menu-item key="1" disabled>{{ user?.fullname }}</a-menu-item>
              <a-menu-item key="2" @click="isLogout">
                <a-typography-text type="danger">Đăng xuất</a-typography-text>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-layout-header>
      <router-view />
      <a-layout-footer
        v-if="$route.name != 'login' && $route.name != 'found'"
        style="text-align: center"
      >
        v0.0.1©2023
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import {
  ShopOutlined,
  BankOutlined,
  BarcodeOutlined,
  TeamOutlined,
  SendOutlined,
  DashboardOutlined,
  BranchesOutlined,
  PullRequestOutlined,
} from "@ant-design/icons-vue";
import LoadingVue from "./components/Loading.vue";
import { storeToRefs } from "pinia";
import { authStore } from "./store/index";

export default {
  setup() {
    const auth = authStore();
    const { user } = storeToRefs(auth);
    return { auth, user };
  },
  components: {
    ShopOutlined,
    BankOutlined,
    BarcodeOutlined,
    TeamOutlined,
    SendOutlined,
    DashboardOutlined,
    BranchesOutlined,
    PullRequestOutlined,
    LoadingVue,
  },
  data() {
    return {
      menu: [
        {
          routerName: "tongquan",
          key: "tongquan",
          title: "Tổng quan",
          icon: "DashboardOutlined",
        },
        {
          routerName: "thuonghieu",
          key: "thuonghieu",
          title: "Thương hiệu",
          icon: "ShopOutlined",
        },
        {
          routerName: "doitac",
          key: "doitac",
          title: "Đối tác",
          icon: "BankOutlined",
        },
        {
          routerName: "voucher",
          key: "voucher",
          title: "Voucher",
          icon: "BarcodeOutlined",
        },
        {
          routerName: "layvoucher",
          key: "layvoucher",
          title: "Lấy voucher",
          icon: "BranchesOutlined",
        },
        {
          routerName: "yeucau",
          key: "yeucau",
          title: "Yêu cầu",
          icon: "PullRequestOutlined",
        },
        {
          routerName: "nguoidung",
          key: "nguoidung",
          title: "Người dùng",
          icon: "TeamOutlined",
        },
      ],
    };
  },
  methods: {
    isLogout() {
      this.auth.logout();
    },
  },
};
</script>
<style>
.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

.site-layout-sub-header-background {
  background: #fff;
}

.site-layout-background {
  background: #fff;
}

.header {
  display: flex;
  align-items: center;
  padding: 0px 20px !important;
  justify-content: right;
}
</style>
