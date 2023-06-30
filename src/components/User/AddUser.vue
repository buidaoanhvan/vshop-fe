<template>
  <a-menu-item key="1" @click="showModal">Thêm người dùng</a-menu-item>
  <a-modal
    v-model:visible="visible"
    width="500px"
    title="Thêm người dùng"
    cancelText="Hủy"
    okText="Thêm"
    :maskClosable="false"
    @ok="handleOk"
  >
    <a-typography-text type="secondary">Tên người dùng:</a-typography-text>
    <a-input
      v-model:value="name"
      placeholder="Tên đối tác"
      style="margin-bottom: 15px"
    />
    <a-typography-text type="secondary">Địa chỉ email:</a-typography-text>
    <a-input
      v-model:value="email"
      placeholder="Địa chỉ email"
      style="margin-bottom: 15px"
    />
    <a-typography-text type="secondary">Liên hệ:</a-typography-text>
    <a-input
      v-model:value="phone"
      placeholder="Liên hệ"
      style="margin-bottom: 15px"
    />
    <a-typography-text type="secondary">Mật khẩu:</a-typography-text>
    <a-input
      v-model:value="password"
      placeholder="Mật khẩu"
      style="margin-bottom: 15px"
      type="password"
    />
    <div class="select-box">
      <a-typography-text type="secondary">Chức vụ:</a-typography-text>
      <a-select
        placeholder="Chọn đối tác"
        style="width: 100%; margin-bottom: 15px"
        :options="rolesList"
        :fieldNames="{ label: 'name', value: 'id' }"
        @change="handleChangeRoles"
      ></a-select>
    </div>
  </a-modal>
</template>
<script>
import { userStore } from "@/store";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const userS = userStore();
    const { rolesList } = storeToRefs(userS);
    return { userS, rolesList };
  },

  data() {
    return {
      visible: false,
      name: "",
      email: "",
      phone: "",
      password: "",
      roleId: "",
    };
  },

  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk() {
      if ((this.name, this.email, this.phone, this.password, this.roleId)) {
        this.userS.addUser(
          this.name,
          this.email,
          this.phone,
          this.password,
          this.roleId
        );
        this.visible = false;
      } else {
        this.$message.error("Vui lòng nhập đủ thông tin!");
      }
    },
    handleChangeRoles(value) {
      this.roleId = value;
    },
  },
};
</script>
