<template>
  <a key="list-loadmore-edit" @click="showModal">Sửa</a>
  <a-modal
    v-model:visible="visible"
    width="500px"
    :title="`Chỉnh sửa thương hiệu ${brand.name}`"
    cancelText="Hủy"
    okText="Cập nhật"
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
        Thay ảnh thương hiệu
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
  props: ["brand"],
  setup() {
    const auth = authStore();
    const brandS = brandStore();
    return { auth, brandS };
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
      this.name = this.brand.name;
      this.imgUrl = this.brand.logo;
    },
    handleOk() {
      this.fileList.forEach((element) => {
        this.imgUrl = element.response.url;
      });
      this.brandS.updateBrand(this.brand.id, this.name, this.imgUrl);
      this.name = "";
      this.imgUrl = "";
      this.fileList = [];
      this.visible = false;
    },
  },
};
</script>
