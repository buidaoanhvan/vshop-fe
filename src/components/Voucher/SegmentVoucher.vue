<template>
  <a @click="showModal">Lấy voucher</a>
  <a-modal
    v-model:visible="visible"
    width="500px"
    title="Tạo yêu câu lấy voucher"
    cancelText="Đóng"
    okText="Tạo yêu cầu"
    :maskClosable="false"
    @ok="handleOk"
  >
    <!-- Giá trị voucher: -->
    <a-typography-text type="secondary">Tên yêu cầu:</a-typography-text>
    <a-input
      v-model:value="name"
      placeholder="Tên yêu cầu"
      style="margin-bottom: 15px"
    />
    <!-- Giá trị voucher: -->
    <a-typography-text type="secondary">Số lượng:</a-typography-text>
    <a-input
      v-model:value="amount"
      placeholder="Số lượng"
      type="number"
      style="margin-bottom: 15px"
    />
  </a-modal>
</template>

<script>
import { segmentStore } from "@/store";

export default {
  props: ["voucher"],
  setup() {
    const segmentS = segmentStore();
    return { segmentS };
  },
  data() {
    return {
      visible: false,
      voucher_id: "",
      name: "",
      amount: "",
    };
  },

  methods: {
    showModal() {
      this.visible = true;
      this.voucher_id = this.voucher.id;
    },
    handleOk() {
      if (this.voucher_id && this.name && this.amount) {
        this.segmentS.addSegment(
          this.voucher_id,
          this.name,
          parseInt(this.amount)
        );
        this.visible = false;
      } else {
        this.$message.warning("Vui lòng nhập đầy đủ thông tin");
      }
    },
  },
};
</script>

<style scoped>
.box-add-vc {
  padding: 0px 10px;
}
</style>
