<template>
  <a-modal
    v-model:visible="visible"
    width="500px"
    :title="`Chỉnh sửa Cửa Hàng ${shopS.name}`"
    cancelText="Hủy"
    okText="Cập nhật"
    :maskClosable="false"
    wrap-class-name="full-modal"
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
    <div class="select-box">
      <a-select
        v-model:value="status"
        placeholder="Chọn Trạng Thái"
        style="width: 100%; margin-bottom: 15px"
        :options="options_status"
        @change="handleChangeStatus"
      ></a-select>
    </div>
    <br />

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
import { authStore } from "../../store/index";
import { shopStore } from "../../store/index";
import api_link from "@/configs/api";

export default {
  setup() {
    const auth = authStore();
    const shopS = shopStore();
    return { auth, shopS };
  },

  props: ["isEdit", "item"],

  watch: {
    isEdit: function (n) {
      this.visible = n;
    },
    visible: function (n) {
      if (n == false) {
        this.$emit("close-is-edit");
      }
    },
    item: function (n) {
      this.name = n.name;
      this.address = n.address;
      this.status = n.status;
      this.imgUrl = n.imgUrl;
    },
  },

  data() {
    return {
      visible: false,
      name: "",
      address: "",
      status: "",
      imgUrl: "",
      url_upload: api_link.upload,
      fileList: [],
      headers: {
        authorization: `Bearer ${this.auth.user.token}`,
      },
      options_status: [
        {
          value: 1,
          label: "Đang hoạt động",
        },
        {
          value: 2,
          label: "Ngừng hoạt động",
        },
      ],
    };
  },

  methods: {
    // showModal() {
    //   this.visible = true;
    //   this.name = this.shop.name;
    //   this.address = this.shop.address;
    //   this.status = this.shop.status;
    //   this.imgUrl = this.shop.logo;
    // },

    handleOk() {
      this.fileList.forEach((element) => {
        this.imgUrl = element.response.url;
      });
      this.shopS.updateShop(
        this.item?.id,
        this.name,
        this.address,
        this.status,
        this.imgUrl
      );
      this.visible = false;
    },
    handleChangeStatus(value) {
      this.status = value;
    },
  },
};
</script>
