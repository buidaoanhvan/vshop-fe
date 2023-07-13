<template>
  <a-modal
    v-model:visible="visible"
    :title="voucher?.title"
    :maskClosable="false"
    width="800px"
    wrap-class-name="full-modal"
    centered
    @ok="okBtn"
  >
    <a-row type="flex" :gutter="[16, 16]">
      <a-col :xs="{ span: 24 }" :sm="{ span: 24 }" :md="{ span: 12 }">
        <a-image
          width="100%"
          height="200px"
          :src="voucher?.image"
          :preview="false"
          fallback="data:image/png;base64,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"
        />
      </a-col>
      <a-col :xs="{ span: 24 }" :sm="{ span: 24 }" :md="{ span: 12 }">
        <a-space direction="vertical">
          <a-typography-text
            >Cửa hàng:
            <a-typography-text type="secondary">{{
              voucher?.shops.name
            }}</a-typography-text></a-typography-text
          >
          <a-typography-text v-if="voucher?.discount_type == 1"
            >Loại:
            <a-typography-text type="secondary"
              >Giảm theo %</a-typography-text
            ></a-typography-text
          >
          <a-typography-text v-if="voucher?.discount_type == 2"
            >Loại:
            <a-typography-text type="secondary"
              >Giảm theo giá tiền</a-typography-text
            ></a-typography-text
          >
          <a-typography-text v-if="voucher?.discount_type == 3"
            >Loại:
            <a-typography-text type="secondary"
              >Giảm theo mô tả</a-typography-text
            ></a-typography-text
          >
          <a-typography-text
            v-if="voucher?.discount_type == 2 || voucher?.discount_type == 1"
            >Giá trị giảm:
            <a-typography-text type="secondary"
              >{{ voucher?.discount_value
              }}{{ voucher?.discount_type == 1 ? "%" : "đ" }}</a-typography-text
            ></a-typography-text
          >
          <a-typography-text
            v-if="voucher?.discount_type == 2 || voucher?.discount_type == 1"
            >Giảm tối đa:
            <a-typography-text type="secondary"
              >{{ voucher?.max_discount }}đ</a-typography-text
            ></a-typography-text
          >
          <a-typography-text
            >Số lượng còn:
            <a-typography-text type="secondary">{{
              voucher?.max_discount
            }}</a-typography-text></a-typography-text
          >
          <a-typography-text
            >Trạng thái:
            <a-tag color="error" v-if="voucher?.status == 0">Chưa duyệt</a-tag>
            <a-tag color="success" v-if="voucher?.status == 1">Đã duyệt</a-tag>
          </a-typography-text>
        </a-space>
      </a-col>
    </a-row>
    <a-divider style="border-color: #1px solid #f0f0f0" dashed />
    <a-row type="flex" :gutter="16">
      <a-col :xs="{ span: 24 }" :sm="{ span: 24 }" :md="{ span: 24 }">
        <a-space direction="vertical">
          <a-typography-text
            >Mô tả:
            <a-typography-text type="secondary">{{
              voucher?.description
            }}</a-typography-text></a-typography-text
          >
          <a-typography-text
            >Bắt đầu:
            <a-typography-text type="secondary">
              {{ dateTime(voucher?.start_time) }}</a-typography-text
            ></a-typography-text
          >
          <a-typography-text
            >Kết thúc:
            <a-typography-text type="secondary">{{
              dateTime(voucher?.start_end)
            }}</a-typography-text></a-typography-text
          >
        </a-space>
      </a-col>
    </a-row>
  </a-modal>
</template>

<script>
export default {
  props: ["isDetail", "item"],
  watch: {
    isDetail: function (n) {
      this.visible = n;
    },
    visible: function (n) {
      if (n == false) {
        this.$emit("close-is-detail");
      }
    },
    item: function (n) {
      this.voucher = n;
    },
  },
  data() {
    return {
      visible: false,
      voucher: null,
    };
  },
  methods: {
    okBtn() {
      this.visible = false;
    },
    dateTime(value) {
      return this.$dayjs.utc(value).local().format("DD/MM/YYYY");
    },
  },
};
</script>
