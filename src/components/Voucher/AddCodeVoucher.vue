<template>
  <a @click="showModal">Tạo QRCode</a>
  <a-modal
    v-model:visible="visible"
    width="500px"
    :title="`Nhập số lượng QRCode của Voucher ( ${voucher.title} )`"
    cancelText="Hủy"
    okText="Nhập"
    :maskClosable="false"
    @ok="handleOk"
  >
    <a-input
      v-model:value="quantity"
      placeholder="Nhập số lượng QRCode muốn tạo"
      style="margin-bottom: 15px"
      required
    />
  </a-modal>
</template>
<script>
import { voucherStore } from "@/store";

export default {
  setup() {
    const voucherS = voucherStore();
    return { voucherS };
  },
  props: ["voucher"],

  data() {
    return {
      visible: false,
      voucherId: this.voucher.id,
      quantity: "",
    };
  },

  methods: {
    showModal() {
      this.visible = true;
      this.voucherId = this.voucher.id;
    },
    handleOk() {
      if (this.quantity > 0) {
        this.voucherS.createCodeVoucher(this.voucherId, this.quantity);
        this.voucherId;
        this.quantity = "";
        this.visible = false;
      } else {
        this.$message.error("Vui lòng nhập số lượng QRCode bạn muốn thêm");
      }
    },
  },
};
</script>
