<template>
  <a-modal
    v-model:visible="visible"
    :title="`Chi Tiết QRCore của Voucher (  )`"
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
      <a-list :data-source="listCode" style="overflow-x: hidden">
        <template #renderItem="{ item }">
          <a-row type="flex" :gutter="[16, 16]">
            <a-col :xs="{ span: 24 }" :sm="{ span: 24 }" :md="{ span: 12 }">
              <a-image
                width="200px"
                height="200px"
                :src="urlQr + item.codex"
                :preview="false"
                fallback="data:image/png;base64,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"
              />
            </a-col>
            <a-col :xs="{ span: 24 }" :sm="{ span: 24 }" :md="{ span: 12 }">
              <a-space direction="vertical">
                <a-typography-text
                  >Mã:
                  <a-typography-text type="secondary">{{
                    item.codex
                  }}</a-typography-text></a-typography-text
                >
                <a-typography-text
                  >Trạng thái:
                  <a-tag color="success" v-if="item.is_used == 0"
                    >Chưa dùng</a-tag
                  >
                  <a-tag color="error" v-if="item.is_used == 1">Đã dùng</a-tag>
                </a-typography-text>
              </a-space>
            </a-col>
          </a-row>
        </template>
      </a-list>
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

    const clearListCode = () => {
      listCode.value = [];
    };

    return { code, listCode, voucherS, container, clearListCode };
  },
  props: ["isVoucherViewCode", "item"],
  watch: {
    isVoucherViewCode: function (n) {
      console.log(this.listCode);
      this.visible = n;
    },
    visible: function (n) {
      if (n == false) {
        this.clearListCode();
        this.$emit("close-is-view-code");
      }
    },
    item: function (n) {
      // console.log(this.listCode);
      this.voucherId = n.id;
      this.code.getCodeVoucher(this.voucherId, 1);
      this.listCode = [];
    },
  },
  data() {
    return {
      visible: false,
      voucherId: null,
      urlQr: "https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=",
      codex: "",
      is_used: "",
      isEndOfPage: false,
    };
  },

  methods: {
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
        .getCodeVoucher(this.voucherId, nextPage)
        .then((response) => {
          this.listCode = [...this.listCode, ...response.data]; // Thêm dữ liệu của trang tiếp theo vào danh sách
        })
        .catch((error) => {
          console.error("Error loading next page data:", error);
        });
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
