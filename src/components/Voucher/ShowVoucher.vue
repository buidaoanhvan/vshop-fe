<template>
  <a @click="showModal">Chi tiết</a>
  <a-modal
    v-model:visible="visible"
    width="800px"
    :title="voucher.title"
    cancelText="Đóng"
    @ok="handleOk"
  >
    <a-row>
      <a-col :span="8"><a-image :width="200" :src="voucher.image" /></a-col>
      <a-col :span="16">
        <a-descriptions>
          <a-descriptions-item
            v-if="voucher.discount_type == 1"
            label="Loại giảm giá"
            style="font-weight: 700"
            >Theo phần trăm</a-descriptions-item
          >
          <a-descriptions-item
            v-if="voucher.discount_type == 2"
            label="Loại giảm giá"
            style="font-weight: 700"
            >Theo giá tiền</a-descriptions-item
          >
          <a-descriptions-item
            v-if="voucher.discount_type == 3"
            label="Loại giảm giá"
            style="font-weight: 700"
            >Khác</a-descriptions-item
          >
        </a-descriptions>
        <a-descriptions>
          <a-descriptions-item
            v-if="voucher.discount_type == 1"
            label="Giá trị"
            style="font-weight: 700"
            >{{ voucher.discount_value }}%</a-descriptions-item
          >
          <a-descriptions-item
            v-if="voucher.discount_type == 2"
            label="Giá trị"
            style="font-weight: 700"
            >{{ voucher.discount_value }}đ</a-descriptions-item
          >
          <a-descriptions-item
            v-if="voucher.discount_type == 3"
            label="Giá trị"
            style="font-weight: 700"
            >Theo mô tả</a-descriptions-item
          >
        </a-descriptions>
        <a-descriptions>
          <a-descriptions-item label="Ngày bắt đầu" style="font-weight: 700">{{
            dateTime(voucher.start_time)
          }}</a-descriptions-item>
        </a-descriptions>
        <a-descriptions>
          <a-descriptions-item label="Ngày kết thúc" style="font-weight: 700">{{
            dateTime(voucher.end_time)
          }}</a-descriptions-item>
        </a-descriptions>
      </a-col>
    </a-row>
    <a-divider orientation="left">Mô tả:</a-divider>
    <p>{{ voucher.description }}</p>
  </a-modal>
</template>

<script>
export default {
  props: ["voucher"],
  data() {
    return {
      visible: false,
    };
  },

  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk() {
      // console.log(this.voucher);
    },
    dateTime(value) {
      return this.$dayjs.utc(value).local().format("DD/MM/YYYY HH:mm:ss");
    },
  },
};
</script>

<style scoped>
.box-add-vc {
  padding: 0px 10px;
}
</style>
