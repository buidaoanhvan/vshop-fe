<template>
  <a @click="showModal">Sửa</a>
  <a-modal
    v-model:visible="visible"
    width="500px"
    :title="`Chỉnh sửa đối tác ${supplier.name}`"
    cancelText="Hủy"
    okText="Cập nhật"
    :maskClosable="false"
    @ok="handleOk"
  >
    <a-typography-text type="secondary">Tên đối tác:</a-typography-text>
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
  </a-modal>
</template>
<script>
import { supplierStore } from "@/store";

export default {
  setup() {
    const supplierS = supplierStore();
    return { supplierS };
  },
  props: ["supplier"],
  data() {
    return {
      visible: false,
      name: "",
      email: "",
      phone: "",
    };
  },

  methods: {
    showModal() {
      this.visible = true;
      this.name = this.supplier.name;
      this.email = this.supplier.email;
      this.phone = this.supplier.phone;
    },
    handleOk() {
      this.supplierS.updateSupplier(
        this.supplier.id,
        this.name,
        this.email,
        this.phone
      );
      this.visible = false;
    },
  },
};
</script>
