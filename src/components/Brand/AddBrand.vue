<template>
  <a-button type="primary" @click="showModal" style="margin-left: 10px"
    >+</a-button
  >
  <a-modal
    v-model:visible="visible"
    width="500px"
    title="Thêm thương hiệu"
    cancelText="Hủy"
    okText="Thêm"
    :maskClosable="false"
    @ok="handleOk"
  >
    <a-input
      v-model:value="name"
      placeholder="Tên thương hiệu"
      style="margin-bottom: 15px"
    />
    <a-upload
      v-model:file-list="fileList"
      list-type="picture"
      :max-count="1"
      :action="url_upload"
      :headers="headers"
    >
      <a-button>
        <upload-outlined></upload-outlined>
        Tải ảnh thương hiệu
      </a-button>
    </a-upload>
  </a-modal>
</template>
<script>
import { UploadOutlined } from "@ant-design/icons-vue";
import { authStore } from "../../store/index";
import { brandStore } from "../../store/index";
import api_link from "@/configs/api";

export default {
  components: {
    UploadOutlined,
  },
  setup() {
    const auth = authStore();
    const brand = brandStore();
    return { auth, brand };
  },
  data() {
    return {
      visible: false,
      name: "",
      fileList: [],
      imgUrl: "",
      headers: {
        authorization: `Bearer ${this.auth.user.token}`,
      },
      url_upload: api_link.upload,
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk() {
      if (this.name && this.fileList.length > 0) {
        this.fileList.forEach((element) => {
          this.imgUrl = element.response.url;
        });
        this.brand.addBrand(this.name, this.imgUrl);
        this.name = "";
        this.fileList = [];
        this.imgUrl = "";
        this.visible = false;
      } else {
        this.$message.error("Vui lòng nhập tên thương hiệu và hình ảnh");
      }
    },
  },
};
</script>
