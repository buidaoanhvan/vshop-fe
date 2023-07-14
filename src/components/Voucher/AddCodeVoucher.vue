<template>
  <a-modal
    v-model:visible="visible"
    width="500px"
    :title="`Nhập số lượng QRCode của Voucher ( ${voucherTitle} )`"
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
  props: ["isVoucherCode", "item"],
  watch: {
    isVoucherCode: function (n) {
      this.visible = n;
    },
    visible: function (n) {
      if (n == false) {
        this.$emit("close-is-add-code");
      }
    },
    item: function (n) {
      this.voucherId = n.id;
      this.voucherTitle = n.title;
    },
  },
  data() {
    return {
      visible: false,
      voucherId: "",
      voucherTitle: "",
      quantity: "",
    };
  },

  methods: {
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
