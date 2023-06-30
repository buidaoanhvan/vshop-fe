<template>
  <a-layout-content class="content">
    <div
      :style="{
        padding: '24px',
        background: '#fff',
        height: 'calc(100vh - 159px)',
        overflow: 'auto',
      }"
    >
      <a-row>
        <a-typography-title :level="3">Voucher</a-typography-title>
        <AddVoucher></AddVoucher>
      </a-row>
      <div
        :style="{
          height: 'calc(100vh - 268px)',
          marginTop: '16px',
          overflow: 'auto',
        }"
      >
        <a-table
          :columns="columns"
          :data-source="listVoucher"
          :pagination="false"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'image'">
              <a-image :width="100" :height="100" :src="record.image" />
            </template>
            <template v-if="column.key === 'discount_value'">
              <a v-if="record.discount_type == 1">
                {{ record.discount_value }}%
              </a>
              <a v-if="record.discount_type == 2"
                >{{ record.discount_value }}Đ</a
              >
              <a v-if="record.discount_type == 3"> Loại khác </a>
            </template>
            <template v-if="column.key === 'max_discount'">
              {{ record.max_discount }}Đ
            </template>
            <template v-if="column.key === 'start_time'">
              {{ dateTime(record.start_time) }}
            </template>
            <template v-if="column.key === 'end_time'">
              {{ dateTime(record.end_time) }}
            </template>
            <template v-else-if="column.key === 'action'">
              <a-dropdown-button>
                <template #overlay>
                  <a-menu>
                    <a-menu-item key="1">
                      <EditVoucher :voucher="record"></EditVoucher>
                    </a-menu-item>
                    <a-menu-item key="2">
                      <AddCodeVoucher :voucher="record"></AddCodeVoucher>
                    </a-menu-item>
                    <a-menu-item key="1"
                      ><a @click="deleteSupplier(record.id)"
                        >Xóa</a
                      ></a-menu-item
                    >
                  </a-menu>
                </template>
                <template #icon><DownOutlined /></template>
              </a-dropdown-button>
            </template>
          </template>
        </a-table>
      </div>
    </div>
  </a-layout-content>
</template>
<script>
import AddVoucher from "../components/Voucher/AddVoucher.vue";
import EditVoucher from "../components/Voucher/EditVoucher.vue";
import AddCodeVoucher from "@/components/Voucher/AddCodeVoucher.vue";
import { storeToRefs } from "pinia";
import { voucherStore } from "@/store";
import { DownOutlined } from "@ant-design/icons-vue";

export default {
  components: { AddVoucher, EditVoucher, AddCodeVoucher, DownOutlined },
  setup() {
    const voucherS = voucherStore();
    const { listVoucher } = storeToRefs(voucherS);
    return { voucherS, listVoucher };
  },
  data() {
    return {
      columns: [
        {
          title: "Hình ảnh",
          dataIndex: "image",
          key: "image",
        },
        {
          title: "Tên voucher",
          dataIndex: "title",
          key: "title",
        },
        {
          title: "Mô tả",
          dataIndex: "description",
          key: "description",
        },
        {
          title: "Giá trị giảm",
          dataIndex: "discount_value",
          key: "discount_value",
        },
        {
          title: "Giảm tối đa",
          dataIndex: "max_discount",
          key: "max_discount",
        },
        {
          title: "Ngày bắt đầu",
          dataIndex: "start_time",
          key: "start_time",
        },
        {
          title: "Ngày kết thúc",
          dataIndex: "end_time",
          key: "end_time",
        },
        {
          title: "Hành động",
          key: "action",
        },
      ],
      data: [],
    };
  },
  created() {
    this.voucherS.getVoucherAll();
  },

  methods: {
    dateTime(value) {
      return this.$dayjs.utc(value).local().format("DD/MM/YYYY HH:mm:ss");
    },
    deleteSupplier(id) {
      this.voucherS.deleteVoucher(id);
    },
  },
};
</script>
<style>
.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

.ant-card-body {
  padding: 16px !important;
}
.abc {
  padding: 2px !important;
}

.site-layout-sub-header-background {
  background: #fff;
}

.site-layout-background {
  background: #fff;
}
.content {
  margin: 24px 16px 0;
}
</style>
