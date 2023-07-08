<template>
  <div>
    <StreamBarcodeReader v-if="camera" @decode="onDecode" @loaded="onLoaded" />
    <a-button type="primary" @click="showCamera">Mở Camera</a-button>

    <a-modal
      v-model:visible="visible"
      @ok="handleOk"
      :confirm-loading="confirmLoading"
      title="Chi Tiết Voucher"
    >
      <a-image
        alt="example"
        :src="codeDetail.vouchers.image"
        style="border: 1px solid #f0f0f0"
        width="100%"
        height="200px"
        :preview="false"
      />
      <a-typography-title
        :level="4"
        style="text-align: center; margin-top: 10px"
        >{{ codeDetail.vouchers.title }}</a-typography-title
      >
      <div style="display: flex; justify-content: center">
        <a-tag color="green" style="font-size: 18px; padding: 10px">
          {{ codeDetail.codex }}
          <br />
          <p
            style="font-size: 15px; color: red; text-align: center; margin: 8px"
          >
            HSD: {{ codeDetail.vouchers.end_time }}
          </p>
        </a-tag>
      </div>
      <div
        style="
          max-height: 100px;
          overflow-y: auto;
          font-size: 18px;
          text-align: center;
        "
      >
        {{ codeDetail.vouchers.description }}
      </div>
      <div>
        <div style="margin: 15px 0 -8px 0; text-align: right">
          <a-tag color="orange" style="font-size: 15px">
            {{ getQRValue(codeDetail.is_used) }}
          </a-tag>
          <a-tag color="blue" style="font-size: 15px; margin: 5px"
            >Giá trị: {{ codeDetail.vouchers.max_discount }} đ</a-tag
          >
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { StreamBarcodeReader } from "vue-barcode-reader";
import { voucherStore } from "@/store";
import { storeToRefs } from "pinia";
import { ref } from "vue";

export default {
  components: {
    StreamBarcodeReader,
  },

  setup() {
    const code = voucherStore();
    const codeDetail = storeToRefs(code).codeDetail;
    const confirmLoading = ref(false);
    const visible = ref(false);

    return { code, codeDetail, confirmLoading, visible };
  },

  data() {
    return {
      result: "",
      camera: false,
    };
  },

  methods: {
    async handleOk() {
      if (this.codeDetail.is_used === 0) {
        console.log("test" + this.codeDetail.codex);
        this.code.updateIsUsed(this.codeDetail.codex);
        // this.confirmLoading = true;
        // setTimeout(() => {
        //   this.visible = false;
        //   this.confirmLoading = false;
        // }, 500);
        this.visible = false;
      }
    },

    async onDecode(result) {
      this.camera = false;
      await this.code.getCodeDetail(result);
      console.log(this.codeDetail);
      this.result = result;
      this.visible = true;
    },

    getQRValue(is_used) {
      if (is_used === 0) {
        return "Chưa dùng";
      } else if (is_used === 1) {
        return "Đã dùng";
      }
    },

    showCamera() {
      this.camera = true;
    },
  },
};
</script>

<style scoped>
.error {
  font-weight: bold;
  color: red;
}
</style>
