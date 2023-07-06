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
    <!-- <a-upload
      :file-list="fileList"
      :before-upload="beforeUpload"
      @remove="handleRemove"
    >
      <a-button>
        <upload-outlined></upload-outlined>
        Chọn File Upload
      </a-button>
    </a-upload> -->
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
// import { UploadOutlined } from "@ant-design/icons-vue";
// import axios from "axios";
// import api_link from "@/configs/api";

export default {
  setup() {
    const voucherS = voucherStore();
    return { voucherS };
  },
  props: ["voucher"],

  // components: {
  //   UploadOutlined,
  // },

  data() {
    return {
      visible: false,
      // uploading: false,
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
        // console.log(this.voucherId);
        // console.log(this.quantity);
        this.voucherS.createCodeVoucher(this.voucherId, this.quantity);
        this.voucherId;
        this.quantity = "";
        this.visible = false;
      } else {
        this.$message.error("Vui lòng nhập số lượng QRCode bạn muốn thêm");
      }
    },
    // beforeUpload(file) {
    //   this.fileList = [file];
    //   return false;
    // },

    // handleRemove(file) {
    //   const index = this.fileList.indexOf(file);
    //   const newFileList = this.fileList.slice();
    //   newFileList.splice(index, 1);
    //   this.fileList = newFileList;
    // },

    // handleUpload() {
    //   if (this.fileList.length == 1 && this.voucherId) {
    //     this.visible = false;
    //     const formData = new FormData();
    //     formData.append("file", this.fileList[0]);
    //     axios
    //       .post(api_link.quantity + "/import/" + this.voucherId, formData)
    //       .then((res) => {
    //         if (res.data.statusCode == 200) {
    //           this.$message.success(res.data.message);
    //         } else {
    //           this.$message.warning("Vui lòng thử lại sau!");
    //         }
    //       });
    //   } else {
    //     this.$message.warning("Vui lòng kiểm tra lại dữ liệu");
    //   }
    // },
  },
};
</script>

<style scoped>
.box-add-vc {
  padding: 0px 10px;
}
</style>
