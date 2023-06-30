<template>
  <a @click="showModal">Nhập</a>
  <a-modal
    v-model:visible="visible"
    width="500px"
    :title="`Nhập file mã voucher ${voucher.title}`"
    cancelText="Hủy"
    okText="Nhập"
    :maskClosable="false"
    @ok="handleUpload"
  >
    <a-upload
      :file-list="fileList"
      :before-upload="beforeUpload"
      @remove="handleRemove"
    >
      <a-button>
        <upload-outlined></upload-outlined>
        Chọn File Upload
      </a-button>
    </a-upload>
  </a-modal>
</template>
<script>
import { voucherStore } from "@/store";
import { UploadOutlined } from "@ant-design/icons-vue";
import axios from "axios";
import api_link from "@/configs/api";

export default {
  setup() {
    const voucherS = voucherStore();
    return { voucherS };
  },
  props: ["voucher"],

  components: {
    UploadOutlined,
  },

  data() {
    return {
      visible: false,
      uploading: false,
      voucherId: null,
      fileList: [],
    };
  },

  methods: {
    showModal() {
      this.visible = true;
      this.voucherId = this.voucher.id;
    },
    beforeUpload(file) {
      this.fileList = [file];
      return false;
    },

    handleRemove(file) {
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
      this.fileList = newFileList;
    },

    handleUpload() {
      if (this.fileList.length == 1 && this.voucherId) {
        this.visible = false;
        const formData = new FormData();
        formData.append("file", this.fileList[0]);
        axios
          .post(api_link.codex + "/import/" + this.voucherId, formData)
          .then((res) => {
            if (res.data.statusCode == 200) {
              this.$message.success(res.data.message);
            } else {
              this.$message.warning("Vui lòng thử lại sau!");
            }
          });
      } else {
        this.$message.warning("Vui lòng kiểm tra lại dữ liệu");
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
