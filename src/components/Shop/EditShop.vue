<template>
  <a key="list-loadmore-edit" @click="showModal">Sửa</a>
  <a-modal
    v-model:visible="visible"
    width="500px"
    :title="`Chỉnh sửa Cửa Hàng ${shop.name}`"
    cancelText="Hủy"
    okText="Cập nhật"
    :maskClosable="false"
    @ok="handleOk"
  >
    <a-input
      v-model:value="name"
      placeholder="Tên Cửa Hàng"
      style="margin-bottom: 15px"
    />
    <a-input
      v-model:value="address"
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
        Thay ảnh Cửa Hàng
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
  props: ["shop"],
  setup() {
    const auth = authStore();
    const shopS = shopStore();
    return { auth, shopS };
  },
  data() {
    return {
      visible: false,
      name: "",
      address: "",
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
      this.name = this.shop.name;
      this.address = this.shop.address;
      this.imgUrl = this.shop.logo;
    },
    handleOk() {
      this.fileList.forEach((element) => {
        this.imgUrl = element.response.url;
      });
      this.shopS.updateShop(this.shop.id, this.name, this.address, this.imgUrl);
      this.name = "";
      this.address = "";
      this.fileList = [];
      this.imgUrl = "";
      this.visible = false;
    },
  },
};
</script>
