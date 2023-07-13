<template>
  <a-modal
    v-model:visible="visible"
    :title="title"
    cancelText="Hủy"
    okText="Cập nhật"
    :maskClosable="false"
    width="800px"
    centered
    wrap-class-name="full-modal"
    @ok="handleOk"
  >
    <!-- Tên voucher: -->
    <a-typography-text type="secondary">Tên voucher:</a-typography-text>
    <a-input
      v-model:value="title"
      placeholder="Tên voucher"
      style="margin-bottom: 15px"
    />
    <!-- Mô tả: -->
    <a-typography-text type="secondary">Mô tả:</a-typography-text>
    <a-textarea
      :rows="2"
      v-model:value="description"
      placeholder="Mô tả"
      style="margin-bottom: 15px"
    />
    <!-- Hình ảnh: -->
    <a-upload
      v-model:file-list="fileList"
      list-type="picture"
      :max-count="1"
      :action="url_upload"
      :headers="headers"
    >
      <a-button>
        <upload-outlined></upload-outlined>
        Thay ảnh Voucher
      </a-button>
    </a-upload>

    <!-- Ngày bắt đầu: -->
    <a-typography-text type="secondary">Ngày bắt đầu:</a-typography-text>
    <a-date-picker
      show-time
      v-model:value="start_time"
      :format="dateFormat"
      placeholder="Ngày bắt đầu"
      style="width: 100%; margin-bottom: 15px"
      @change="onChangeStart"
    />

    <!-- Giá trị voucher: -->
    <a-typography-text type="secondary">Giá trị voucher:</a-typography-text>
    <a-input
      v-model:value="discount_value"
      placeholder="Giá trị giảm"
      style="margin-bottom: 15px"
    />
    <!-- Loại voucher giảm: -->
    <div class="select-box">
      <a-typography-text type="secondary">Loại voucher giảm:</a-typography-text>
      <a-select
        v-model:value="discount_type"
        placeholder="Chọn loại giảm giá"
        style="width: 100%; margin-bottom: 15px"
        :options="options_discount_type"
        @change="handleChangeDiscountType"
      ></a-select>
    </div>
    <!-- Giảm tối đa: -->
    <a-typography-text type="secondary">Giảm tối đa:</a-typography-text>
    <a-input
      v-model:value="max_discount"
      placeholder="Giảm tối đa"
      style="margin-bottom: 15px"
    />
    <!-- Ngày kết thúc: -->
    <a-typography-text type="secondary">Ngày kết thúc:</a-typography-text>
    <a-date-picker
      show-time
      v-model:value="end_time"
      :format="dateFormat"
      placeholder="Ngày kết thúc"
      style="width: 100%; margin-bottom: 15px"
      @change="onChangeEnd"
    />
  </a-modal>
</template>
<script>
import { voucherStore } from "@/store";
import { authStore } from "../../store/index";
import api_link from "@/configs/api";

export default {
  setup() {
    const dateFormat = "YYYY/MM/DD";
    const auth = authStore();
    const voucherS = voucherStore();
    return { voucherS, auth, dateFormat };
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
      this.title = n.title;
      this.description = n.description;
      this.discount_value = n.discount_value;
      this.discount_type = n.discount_type;
      this.max_discount = n.max_discount;
      this.imgUrl = n.imgUrl;
      this.start_time = this.$dayjs.utc(n.start_time).local();
      this.end_time = this.$dayjs.utc(n.end_time).local();
    },
  },

  data() {
    return {
      visible: false,
      title: "",
      description: "",
      discount_value: "",
      discount_type: "",
      max_discount: "",
      imgUrl: "",
      start_time: "",
      end_time: "",
      url_upload: api_link.upload,
      fileList: [],
      headers: {
        authorization: `Bearer ${this.auth.user.token}`,
      },
      options_discount_type: [
        {
          value: 1,
          label: "Giảm theo %",
        },
        {
          value: 2,
          label: "Giảm theo giá tiền",
        },
        {
          value: 3,
          label: "Giảm theo cách thức khác",
        },
      ],
    };
  },

  methods: {
    filterShop(input, option) {
      return option.name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    },

    handleChangeDiscountType(value) {
      this.discount_type = value;
    },

    onChangeStart(date) {
      this.start_time = date;
    },

    onChangeEnd(date) {
      this.end_time = date;
    },

    async handleOk() {
      this.fileList.forEach((element) => {
        this.imgUrl = element.response.url;
      });
      const code = await this.voucherS.updateVoucher(
        this.item?.id,
        this.title,
        this.description,
        this.imgUrl,
        parseInt(this.discount_value),
        parseInt(this.discount_type),
        parseInt(this.max_discount),
        this.start_time,
        this.end_time
      );
      if (code == "00") {
        this.fileList = [];
        this.imgUrl = "";
        this.visible = false;
      }
    },
  },
};
</script>

<style>
.box-add-vc {
  padding: 0px 10px;
}
</style>
