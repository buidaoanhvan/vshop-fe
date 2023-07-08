<template>
  <a @click="showModal">Xem QRCode</a>
  <a-modal
    v-model:visible="visible"
    :title="`Chi Tiết QRCore của Voucher ( ${voucher.title} )`"
    :footer="null"
  >
    <div
      :style="{
        height: 'calc(100vh - 268px)',
        marginTop: '16px',
        overflow: 'auto',
      }"
      class="box-add-vc"
      @scroll="handleScroll"
      ref="container"
    >
      <a-table :columns="columns" :data-source="listCode" :pagination="false">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'qr'">
            <a-image :width="100" :height="100" :src="urlQr + record.codex" />
          </template>
          <template v-if="column.key === 'codex'">
            {{ record.codex }}
          </template>
          <template v-if="column.key === 'is_used'">
            <span
              :class="{
                'red-text': record.is_used === 1,
                'green-text': record.is_used === 0,
              }"
            >
              {{ getQRValue(record) }}
            </span>
          </template>
        </template>
      </a-table>
    </div>
  </a-modal>
</template>

<script>
import { voucherStore } from "@/store";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";

export default {
  setup() {
    const code = voucherStore();
    const voucherS = voucherStore();
    const { listCode } = storeToRefs(code);

    const container = ref(null);
    onMounted(() => {
      container.value = document.querySelector(".box-add-vc");
    });

    return { code, listCode, voucherS, container };
  },
  props: ["voucher"],

  data() {
    return {
      visible: false,
      quantity: "",
      urlQr: "https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=",
      columns: [
        {
          title: "QR",
          dataIndex: "codex",
          key: "qr",
        },
        {
          title: "Codex",
          dataIndex: "codex",
          key: "codex",
        },
        {
          title: "Trạng thái",
          dataIndex: "is_used",
          key: "is_used",
        },
      ],
      isEndOfPage: false,
    };
  },

  methods: {
    showModal() {
      this.visible = true;
      this.code.getCodeVoucher(this.voucher.id, 1);
      this.listCode = [];
    },
    handleScroll() {
      const scrollPosition =
        this.$refs.container.scrollTop + this.$refs.container.clientHeight;
      const maxScroll = this.$refs.container.scrollHeight;

      if (scrollPosition === maxScroll && !this.isEndOfPage) {
        this.loadNextPageData();
      }
    },
    loadNextPageData() {
      const nextPage = this.listCode.length / 10 + 1; // Lấy trang tiếp theo
      this.code
        .getCodeVoucher(this.voucher.id, nextPage)
        .then((response) => {
          this.listCode = [...this.listCode, ...response.data]; // Thêm dữ liệu của trang tiếp theo vào danh sách
        })
        .catch((error) => {
          console.error("Error loading next page data:", error);
        });
    },
    getQRValue(item) {
      if (item.is_used === 0) {
        return "Chưa dùng";
      } else if (item.is_used === 1) {
        return "Đã dùng";
      }
    },
  },
};
</script>

<style scoped>
.box-add-vc {
  padding: 0px 10px;
}
.red-text {
  color: red;
}

.green-text {
  color: green;
}
</style>
