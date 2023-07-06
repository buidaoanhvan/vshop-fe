<template>
  <div>
    <StreamBarcodeReader v-if="camera" @decode="onDecode" @loaded="onLoaded" />
    <a-button type="primary" @click="showCamera">Mở Camera</a-button>

    <a-modal v-model:visible="visible" title="Chi Tiết Voucher">
      <a-image
        alt="example"
        :src="codeDetail.vouchers.image"
        style="border: 1px solid #f0f0f0"
        width="100%"
        height="200px"
        :preview="false"
      />
      <a-typography-title :level="4">{{
        codeDetail.vouchers.title
      }}</a-typography-title>
      <div style="display: flex; justify-content: center">
        <a-tag color="green" style="font-size: 16px; padding: 10px">
          {{ codeDetail.codex }}
          <br />
          <p style="font-size: 12px; color: red; text-align: center; margin: 0">
            HSD: {{ codeDetail.vouchers.end_time }}
          </p>
        </a-tag>
      </div>
      <a-tag color="blue"
        >Giá trị: {{ codeDetail.vouchers.max_discount }} đ</a-tag
      >
      <div style="max-height: 100px; overflow-y: auto">
        {{ codeDetail.vouchers.description }}
      </div>
      <div>
        {{ getQRValue(codeDetail.is_used) }}
      </div>
    </a-modal>
  </div>
</template>

<script>
import { StreamBarcodeReader } from "vue-barcode-reader";
import { voucherStore } from "@/store";
import { storeToRefs } from "pinia";

export default {
  components: {
    StreamBarcodeReader,
  },

  setup() {
    const code = voucherStore();
    const { codeDetail } = storeToRefs(code);
    return { code, codeDetail };
  },

  data() {
    return {
      result: "",
      visible: false,
      camera: false,
    };
  },

  methods: {
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
