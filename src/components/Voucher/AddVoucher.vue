<template>
  <a-button type="primary" @click="showModal" style="margin-left: 10px"
    >+</a-button
  >
  <a-modal
    v-model:visible="visible"
    width="800px"
    title="Thêm Voucher"
    cancelText="Hủy"
    okText="Thêm"
    :maskClosable="false"
    @ok="handleOk"
  >
    <a-row>
      <a-col :span="12" class="box-add-vc">
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
        <!-- Cửa Hàng cung cấp: -->
        <div class="select-box">
          <a-typography-text type="secondary"
            >Cửa Hàng cung cấp:</a-typography-text
          >
          <a-select
            v-model:value="shop_id"
            show-search
            placeholder="Chọn Cửa Hàng"
            style="width: 100%; margin-bottom: 15px"
            :options="listShop"
            :filter-option="filterShop"
            :fieldNames="{ label: 'name', value: 'id' }"
            @change="handleChangeShop"
          ></a-select>
        </div>
        <!-- Ngày bắt đầu: -->
        <a-typography-text type="secondary">Ngày bắt đầu:</a-typography-text>
        <a-date-picker
          show-time
          v-model:value="start_time"
          placeholder="Ngày bắt đầu"
          style="width: 100%; margin-bottom: 15px"
          @change="onChangeStart"
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
            Tải hình ảnh voucher
          </a-button>
        </a-upload>
      </a-col>
      <a-col :span="12" class="box-add-vc">
        <!-- Giá trị voucher: -->
        <a-typography-text type="secondary">Giá trị voucher:</a-typography-text>
        <a-input
          v-model:value="discount_value"
          placeholder="Giá trị giảm"
          style="margin-bottom: 15px"
        />
        <!-- Loại voucher giảm: -->
        <div class="select-box">
          <a-typography-text type="secondary"
            >Loại voucher giảm:</a-typography-text
          >
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
          placeholder="Ngày kết thúc"
          style="width: 100%; margin-bottom: 15px"
          @change="onChangeEnd"
        />
      </a-col>
    </a-row>
  </a-modal>
</template>
<script>
import { shopStore, voucherStore, authStore } from "@/store";
import { storeToRefs } from "pinia";
import { UploadOutlined } from "@ant-design/icons-vue";
import api_link from "@/configs/api";

export default {
  setup() {
    const shopS = shopStore();
    const voucherS = voucherStore();
    const auth = authStore();
    const { listShop } = storeToRefs(shopS);
    return { shopS, listShop, voucherS, auth };
  },
  components: {
    UploadOutlined,
  },
  data() {
    return {
      visible: false,
      shop_id: "",
      title: "",
      description: "",
      discount_value: "",
      discount_type: "",
      max_discount: "",
      image: "",
      start_time: "",
      end_time: "",
      fileList: [],
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
      headers: {
        authorization: `Bearer ${this.auth.user.token}`,
      },
      url_upload: api_link.upload,
    };
  },

  methods: {
    showModal() {
      this.visible = true;
      this.shopS.getShopAll();
    },

    filterShop(input, option) {
      return option.name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    },

    handleChangeDiscountType(value) {
      this.discount_type = value;
    },

    handleChangeShop(value) {
      this.shop_id = value;
    },

    onChangeStart(date) {
      this.start_time = date;
    },

    onChangeEnd(date) {
      this.end_time = date;
    },

    handleOk() {
      // <!-- id shopId	title	description	image	status	discount_value	discount_type	max_discount	start_time	end_time -->
      if (
        this.title &&
        this.description &&
        this.discount_value &&
        this.discount_type &&
        this.max_discount &&
        this.start_time &&
        this.end_time &&
        this.fileList.length > 0
      ) {
        this.fileList.forEach((element) => {
          this.image = element.response.url;
        });
        this.voucherS.addVoucher(
          this.shop_id,
          this.title,
          this.description,
          this.image,
          parseInt(this.discount_value),
          parseInt(this.discount_type),
          parseInt(this.max_discount),
          this.start_time,
          this.end_time
        );
        this.shop_id = "";
        this.title = "";
        this.description = "";
        this.image = "";
        this.discount_value = "";
        this.discount_type = "";
        this.max_discount = "";
        this.start_time = "";
        this.end_time = "";
        this.fileList = [];
        this.visible = false;
      } else {
        this.$message.warning("Vui lòng điền đủ thông tin");
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
