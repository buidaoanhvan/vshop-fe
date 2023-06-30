<template>
  <a-layout>
    <a-row class="login">
      <a-col :xs="20" :md="7">
        <a-card class="box-login">
          <a-typography-title style="margin-bottom: 20px" :level="3"
            >Quản Lý Voucher</a-typography-title
          >
          <a-input
            v-model:value="email"
            placeholder="Nhập địa chỉ email"
            type="text"
          >
            <template #prefix>
              <user-outlined
                :style="{ fontSize: '18px', color: '#08c', margin: '0 5px' }"
              /> </template
          ></a-input>
          <a-input
            v-model:value="password"
            placeholder="Nhập mật khẩu"
            type="password"
          >
            <template #prefix>
              <key-outlined
                :style="{ fontSize: '18px', color: '#08c', margin: '0 5px' }"
              />
            </template>
          </a-input>
          <a-button type="primary" block @click="onSubmit">Đăng nhập</a-button>
        </a-card>
      </a-col>
    </a-row>
  </a-layout>
</template>
<script>
import { UserOutlined, KeyOutlined } from "@ant-design/icons-vue";
import { authStore } from "../store/index";
export default {
  setup() {
    const auth = authStore();
    return { auth };
  },
  components: {
    UserOutlined,
    KeyOutlined,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async onSubmit() {
      await this.auth.login(this.email, this.password);
    },
  },
};
</script>

<style scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("~@/assets/bg.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
}

.login .ant-input-affix-wrapper {
  margin-bottom: 0.8rem;
  padding: 6px;
}

.box-login {
  border: unset !important;
  border-radius: 5px;
}
</style>
