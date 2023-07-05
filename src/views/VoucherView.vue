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
        <div>
          <AddVoucher></AddVoucher>
        </div>
        <div>
          <a-input-search
            v-model:value="value"
            placeholder="Tìm kiếm"
            :style="{ width: isMobile ? '100%' : '200px' }"
            @search="onSearch"
          />
        </div>
      </a-row>
      <div
        :style="{
          height: 'calc(100vh - 268px)',
          marginTop: '16px',
          overflow: 'auto',
        }"
      >
        <a-table
          v-if="!isMobile"
          :columns="columns"
          :data-source="listVoucher"
          :pagination="false"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'image'">
              <a-image :width="100" :height="100" :src="record.image" />
            </template>
            <template v-else-if="column.key === 'discount_value'">
              {{ getDiscountValue(record) }}
            </template>
            <template v-else-if="column.key === 'max_discount'">
              {{ record.max_discount }}Đ
            </template>
            <template v-else-if="column.key === 'start_time'">
              {{ dateTime(record.start_time) }}
            </template>
            <template v-else-if="column.key === 'end_time'">
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
                  </a-menu>
                </template>
                <template #icon><DownOutlined /></template>
              </a-dropdown-button>
            </template>
          </template>
        </a-table>
        <div v-else>
          <a-card
            v-for="item in listVoucher"
            :key="item.id"
            style="margin-bottom: 16px"
          >
            <div
              style="
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 16px;
              "
            >
              <a-image :width="100" :height="100" :src="item.image" />
            </div>
            <div style="display: flex; align-items: flex-start">
              <strong style="margin-right: 10px; white-space: nowrap"
                >Tên voucher:</strong
              >
              <p
                style="
                  max-width: 300px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                "
              >
                {{ item.title }}
              </p>
            </div>
            <div style="display: flex; align-items: flex-start">
              <strong style="margin-right: 10px; white-space: nowrap"
                >Mô tả:</strong
              >
              <p
                style="
                  max-width: 300px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                "
              >
                {{ item.description }}
              </p>
            </div>
            <div style="display: flex; align-items: flex-start">
              <strong style="margin-right: 10px; white-space: nowrap"
                >Giá trị giảm:</strong
              >
              <p
                style="
                  max-width: 300px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                "
              >
                {{ getDiscountValue(item) }}
              </p>
            </div>
            <div style="display: flex; align-items: flex-start">
              <strong style="margin-right: 10px; white-space: nowrap"
                >Giảm tối đa:</strong
              >
              <p
                style="
                  max-width: 300px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                "
              >
                {{ item.max_discount }}Đ
              </p>
            </div>
            <div style="display: flex; align-items: flex-start">
              <strong style="margin-right: 10px; white-space: nowrap"
                >Ngày bắt đầu:</strong
              >
              <p
                style="
                  max-width: 300px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                "
              >
                {{ dateTime(item.start_time) }}
              </p>
            </div>
            <div style="display: flex; align-items: flex-start">
              <strong style="margin-right: 10px; white-space: nowrap"
                >Ngày kết thúc:</strong
              >
              <p
                style="
                  max-width: 300px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                "
              >
                {{ dateTime(item.end_time) }}
              </p>
            </div>
            <div style="position: absolute; top: 17px; right: 17px">
              <a-dropdown-button>
                <template #overlay>
                  <a-menu>
                    <a-menu-item key="1">
                      <EditVoucher :voucher="item"></EditVoucher>
                    </a-menu-item>
                    <a-menu-item key="2">
                      <AddCodeVoucher :voucher="item"></AddCodeVoucher>
                    </a-menu-item>
                  </a-menu>
                </template>
                <template #icon><DownOutlined /></template>
              </a-dropdown-button>
            </div>
          </a-card>
        </div>
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

    const isMobile = window.innerWidth <= 768;

    return {
      voucherS,
      listVoucher,
      isMobile,
    };
  },
  data() {
    return {
      value: "",
      columns: [
        {
          title: "Ảnh",
          dataIndex: "image",
          key: "image",
          customRender: (value) => {
            return `<a-image :width="100" :height="100" :src="${value}" />`;
          },
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
          customRender: (value) => {
            return this.getDiscountValue({ discount_value: value });
          },
        },
        {
          title: "Giảm tối đa",
          dataIndex: "max_discount",
          key: "max_discount",
          customRender: (value) => {
            return `${value}Đ`;
          },
        },
        {
          title: "Ngày bắt đầu",
          dataIndex: "start_time",
          key: "start_time",
          customRender: (value) => {
            return this.dateTime(value);
          },
        },
        {
          title: "Ngày kết thúc",
          dataIndex: "end_time",
          key: "end_time",
          customRender: (value) => {
            return this.dateTime(value);
          },
        },
        {
          title: "Hành động",
          key: "action",
          customRender: (text, record) => {
            return `
              <a-dropdown-button>
                <template #overlay>
                  <a-menu>
                    <a-menu-item key="1">
                      <EditVoucher :voucher="${JSON.stringify(
                        record
                      )}"></EditVoucher>
                    </a-menu-item>
                    <a-menu-item key="2">
                      <AddCodeVoucher :voucher="${JSON.stringify(
                        record
                      )}"></AddCodeVoucher>
                    </a-menu-item>
                  </a-menu>
                </template>
                <template #icon><DownOutlined /></template>
              </a-dropdown-button>
            `;
          },
        },
      ],
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
    getDiscountValue(item) {
      if (item.discount_type === 1) {
        return `${item.discount_value}%`;
      } else if (item.discount_type === 2) {
        return `${item.discount_value}Đ`;
      } else {
        return "Loại khác";
      }
    },
    // onSearch(value) {
    //   // Xử lý sự kiện tìm kiếm
    // },
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
