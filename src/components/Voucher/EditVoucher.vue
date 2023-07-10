<template>
  <a @click="showModal">Sửa</a>
  <a-modal
    v-model:visible="visible"
    width="800px"
    :title="voucher.title"
    cancelText="Hủy"
    okText="Cập nhật"
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
        <!-- Thương hiệu cung cấp: -->
        <div class="select-box">
          <a-typography-text type="secondary"
            >Thương hiệu cung cấp:</a-typography-text
          >
          <a-select
            v-model:value="shopId"
            show-search
            placeholder="Chọn thương hiệu"
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
import { shopStore, voucherStore } from "@/store";
import { storeToRefs } from "pinia";
import { authStore } from "../../store/index";
import api_link from "@/configs/api";

export default {
  setup() {
    const auth = authStore();
    const shopS = shopStore();
    const voucherS = voucherStore();
    const { listShop } = storeToRefs(shopS);
    return { shopS, listShop, voucherS, auth };
  },
  props: ["voucher"],
  data() {
    return {
      visible: false,
      shopId: "",
      title: "",
      description: "",
      discount_value: "",
      discount_type: "",
      max_discount: "",
      imgUrl: "",
      fileList: [],
      headers: {
        authorization: `Bearer ${this.auth.user.token}`,
      },
      url_upload: api_link.upload,
      start_time: "",
      end_time: "",
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
    showModal() {
      this.visible = true;
      this.shopS.getShopAll();
      this.shopId = this.voucher.shop_id;
      this.title = this.voucher.title.toString();
      this.description = this.voucher.description.toString();
      // this.image = this.voucher.image.toString();
      this.imgUrl = this.voucher.image;
      this.discount_value = this.voucher.discount_value.toString();
      this.discount_type = this.voucher.discount_type;
      this.max_discount = this.voucher.max_discount.toString();
      this.start_time = this.$dayjs.utc(this.voucher.start_time).local();
      this.end_time = this.$dayjs.utc(this.voucher.end_time).local();
    },

    filterShop(input, option) {
      return option.name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    },

    handleChangeDiscountType(value) {
      this.discount_type = value;
    },

    handleChangeBrand(value) {
      this.brandId = value;
    },

    onChangeStart(date) {
      this.start_time = date;
    },

    onChangeEnd(date) {
      this.end_time = date;
    },

    handleOk() {
      this.fileList.forEach((element) => {
        this.imgUrl = element.response.url;
      });
      // <!-- id	shopId	title	description	image	status	discount_value	discount_type	max_discount	start_time	end_time -->
      if (
        this.title &&
        this.description &&
        this.discount_value &&
        this.discount_type &&
        this.max_discount &&
        this.start_time &&
        this.end_time
      ) {
        this.voucherS.updateVoucher(
          this.voucher.id,
          this.shopId,
          this.title,
          this.description,
          // this.image,
          this.imgUrl,
          parseInt(this.discount_value),
          parseInt(this.discount_type),
          parseInt(this.max_discount),
          this.start_time,
          this.end_time
        );
        this.shopId = "";
        this.title = "";
        this.description = "";
        // this.image = "";
        this.imgUrl = "";
        this.discount_value = "";
        this.discount_type = "";
        this.max_discount = "";
        this.start_time = "";
        this.end_time = "";
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
