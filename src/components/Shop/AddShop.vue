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
      v-model:value="email"
      placeholder="Email"
      style="margin-bottom: 15px"
      required
    />
    <a-input
      v-model:value="password"
      placeholder="Mật Khẩu"
      style="margin-bottom: 15px"
      :type="showPassword ? 'text' : 'password'"
      required
    >
      <template #suffix>
        <a-icon
          :type="showPassword ? 'eye-invisible' : 'eye'"
          @click="togglePasswordVisibility"
          style="cursor: pointer"
        />
      </template>
    </a-input>
    <a-input
      v-model:value="fullname"
      placeholder="Họ Tên Người Đại Diện"
      style="margin-bottom: 15px"
      required
    />
    <a-input
      v-model:value="phone"
      placeholder="Liên Hệ"
      style="margin-bottom: 15px"
      required
    />
    <a-input
      v-model:value="shop_name"
      placeholder="Tên Cửa Hàng"
      style="margin-bottom: 15px"
      required
    />
    <a-input
      v-model:value="shop_address"
      placeholder="Địa Chỉ Cửa Hàng"
      style="margin-bottom: 15px"
      required
    />
    <a-upload
      v-model:file-list="fileList"
      list-type="picture"
      :max-count="1"
      :action="url_upload"
      :headers="headers"
      required
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
import { ref } from "vue";

export default {
  components: {
    UploadOutlined,
  },
  setup() {
    const auth = authStore();
    const shop = shopStore();
    const showPassword = ref(false);

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    return { auth, shop, showPassword, togglePasswordVisibility };
  },
  data() {
    return {
      visible: false,
      email: "",
      password: "",
      fullname: "",
      phone: "",
      shop_name: "",
      shop_address: "",
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
    async handleOk() {
      this.fileList.forEach((element) => {
        this.imgUrl = element.response.url;
      });
      const status = await this.shop.addShop(
        this.email,
        this.password,
        this.fullname,
        this.phone,
        this.shop_name,
        this.imgUrl,
        this.shop_address
      );
      if (status == "00") {
        this.visible = false;
      }
    },
  },
};
</script>
