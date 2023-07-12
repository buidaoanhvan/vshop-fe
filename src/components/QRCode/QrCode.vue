<template>
  <div>
    <StreamBarcodeReader
      v-if="camera"
      @decode="onDecode"
      @loaded="onLoaded"
      style="max-width: 500px"
    />
    <a-button type="primary" @click="showCamera">Mở Camera</a-button>
    <br />
    <a-auto-complete style="width: 300px" @select="handleSearch">
      <a-input-search
        size="large"
        placeholder="Nhập mã QRCode"
        enter-button
        @search="handleSearch"
      ></a-input-search>
    </a-auto-complete>

    <a-modal
      v-model:visible="visibleModaVC"
      :okText="okText"
      :cancelText="null"
      @ok="handleOk"
      :confirm-loading="confirmLoading"
      title="Chi Tiết Voucher"
    >
      <a-image
        alt="example"
        :src="codeDetail?.vouchers.image"
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
            HSD: {{ getLocalEnd(codeDetail.vouchers.end_time) }}
          </p>
        </a-tag>
      </div>
      <div
        style="
          max-height: 100px;
          overflow-y: auto;
          font-size: 18px;
          text-align: center;
          margin: 10px 0px 10px 0px;
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
      camera: false,
      visibleModaVC: false,
      okText: "",
    };
  },

  methods: {
    async handleOk() {
      if (this.codeDetail.is_used === 0) {
        this.confirmLoading = true;
        this.code.updateIsUsed(this.codeDetail.codex);
        this.visibleModaVC = false;
        this.confirmLoading = false;
        this.$message.success("Thành công");
      } else {
        this.confirmLoading = false;
        this.visibleModaVC = false;
      }
    },

    async onDecode(result) {
      if (!result) {
        this.$message.error("Vui lòng đưa mã ra trước camera");
        return;
      }
      this.camera = false;
      await this.code.getCodeDetail(result).then((res) => {
        if (res.code == "00") {
          this.$message.success("Quét QRCode Thành công");
          this.visibleModaVC = true;
        } else {
          this.$message.error("Mã QRCode không đúng");
        }
      });
    },

    async handleSearch(result) {
      if (!result) {
        this.$message.error("Vui lòng nhập mã");
        return;
      }
      await this.code.getCodeDetail(result).then((res) => {
        if (res.code == "00") {
          this.$message.success("Nhập mã thành công");
          this.visibleModaVC = true;
        } else {
          this.$message.error("Mã không đúng");
        }
      });
    },

    getQRValue(is_used) {
      if (is_used === 0) {
        this.okText = "Sử dụng voucher";
        return "Chưa dùng";
      } else if (is_used === 1) {
        this.okText = "Đóng";
        return "Đã dùng";
      }
    },

    getLocalEnd(endTime) {
      return this.$dayjs.utc(endTime).local().format("DD/MM/YYYY HH:mm:ss");
    },

    showCamera() {
      this.camera = true;
      this.visibleModaVC = false;
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
