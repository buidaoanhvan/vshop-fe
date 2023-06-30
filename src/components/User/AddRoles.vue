<template>
  <a-menu-item key="2" @click="showModal">Thêm chức vụ</a-menu-item>
  <a-modal
    v-model:visible="visible"
    width="500px"
    title="Thêm chức vụ"
    cancelText="Hủy"
    okText="Thêm"
    :maskClosable="false"
    @ok="handleOk"
  >
    <a-typography-text type="secondary">Tên chức vụ:</a-typography-text>
    <a-input
      v-model:value="name"
      placeholder="Tên đối tác"
      style="margin-bottom: 15px"
    />
    <a-typography-text type="secondary"
      >Mã chức vụ (viết hoa và không dấu):</a-typography-text
    >
    <a-input
      v-model:value="guard_name"
      placeholder="Tên đối tác"
      style="margin-bottom: 15px"
    />
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
      guard_name: "",
    };
  },

  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk() {
      if (this.name && this.guard_name) {
        this.userS.addRoles(this.name, this.guard_name.toUpperCase());
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
