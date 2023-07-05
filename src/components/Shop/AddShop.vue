<template>
  <a-button type="primary" @click="showModal" style="margin-left: 10px"
    >+</a-button
  >
  <a-modal
    v-model:visible="visible"
    width="500px"
    title="Thêm Cửa Hàng"
    cancelText="Hủy"
    okText="Thêm"
    :maskClosable="false"
    @ok="handleOk"
  >
    <a-input
      v-model:value="name"
      placeholder="Email"
      style="margin-bottom: 15px"
    />
    <a-input
      v-model:value="name"
      placeholder="Mật Khẩu"
      style="margin-bottom: 15px"
    />
    <a-input
      v-model:value="name"
      placeholder="Họ Tên"
      style="margin-bottom: 15px"
    />
    <a-input
      v-model:value="name"
      placeholder="SDT"
      style="margin-bottom: 15px"
    />
    <a-input
      v-model:value="name"
      placeholder="Tên Cửa Hàng"
      style="margin-bottom: 15px"
    />
    <a-input
      v-model:value="name"
      placeholder="Địa Chỉ Cửa Hàng"
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
        Tải ảnh Cửa Hàng
      </a-button>
    </a-upload>
  </a-modal>
</template>
<script>
import { UploadOutlined } from "@ant-design/icons-vue";
import { authStore } from "../../store/index";
import { shopStore } from "../../store/index";
import api_link from "@/configs/api";

export default {
  components: {
    UploadOutlined,
  },
  setup() {
    const auth = authStore();
    const shop = shopStore();
    return { auth, shop };
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
        this.shop.addShop(this.name, this.imgUrl);
        this.name = "";
        this.fileList = [];
        this.imgUrl = "";
        this.visible = false;
      } else {
        this.$message.error("Vui lòng nhập tên Cửa Hàng và hình ảnh");
      }
    },
  },
};
</script>
