<template>
  <a-menu-item key="3" @click="showModal">Gán quyền cho chức vụ</a-menu-item>
  <a-modal
    v-model:visible="visible"
    width="500px"
    title="Gán quyền cho chức vụ"
    cancelText="Hủy"
    okText="Cập nhật"
    :maskClosable="false"
    @ok="handleOk"
  >
    <div class="select-box">
      <a-typography-text type="secondary">Chức vụ:</a-typography-text>
      <a-select
        placeholder="Chọn đối tác"
        style="width: 100%; margin-bottom: 15px"
        :options="rolesList"
        :fieldNames="{ label: 'name', value: 'id' }"
        @change="handleChangeRoles"
      ></a-select>
      <a-checkbox-group
        v-model:value="value"
        name="checkboxgroup"
        :options="permissionsList"
      />
    </div>
  </a-modal>
</template>
<script>
import { userStore } from "@/store";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const userS = userStore();
    const { rolesList, permissionsList, permissionsCheck } = storeToRefs(userS);
    return { userS, rolesList, permissionsList, permissionsCheck };
  },

  data() {
    return {
      visible: false,
      rolesId: "",
      value: [],
    };
  },

  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk() {
      if (this.rolesId) {
        this.userS.updatePermissionRole(this.rolesId, this.value);
        this.visible = false;
      } else {
        this.$message.error("Vui lòng nhập đủ thông tin!");
      }
    },
    async handleChangeRoles(value) {
      await this.userS.getPermissionsRoles(value);
      this.value = this.permissionsCheck;
      this.rolesId = value;
    },
  },
};
</script>
