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
        <a-typography-title :level="3">Yêu cầu lấy voucher</a-typography-title>
      </a-row>
      <div
        :style="{
          height: 'calc(100vh - 268px)',
          marginTop: '16px',
          overflow: 'auto',
        }"
      >
        <a-table :columns="columns" :data-source="listSegment">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'voucher'">
              {{ record.voucher.title }}
            </template>
            <template v-if="column.key === 'user'">
              {{ record.user.email }}
            </template>
            <template v-if="column.key === 'status'">
              <a-tag color="orange" v-if="record.status == 0">Chờ duyệt</a-tag>
              <a-tag color="green" v-if="record.status == 1">Đã duyệt</a-tag>
              <a-tag color="red" v-if="record.status == 2">Từ chối</a-tag>
            </template>
            <template v-if="column.key === 'created_at'">
              {{ dateTime(record.created_at) }}
            </template>
            <template v-else-if="column.key === 'action'">
              <a-dropdown-button>
                <template #overlay>
                  <a-menu>
                    <a-menu-item key="1" @click="acceptSegment(record)"
                      >Duyệt</a-menu-item
                    >
                    <a-menu-item key="2" @click="denySegment(record)"
                      >Từ chối</a-menu-item
                    >
                    <a-menu-item
                      v-if="record.status == 1"
                      key="2"
                      @click="getCsv(record)"
                      >Xuất file</a-menu-item
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
import { storeToRefs } from "pinia";
import { segmentStore } from "@/store";
import { DownOutlined } from "@ant-design/icons-vue";

export default {
  components: {
    DownOutlined,
  },
  setup() {
    const segmentS = segmentStore();
    const { listSegment } = storeToRefs(segmentS);
    return { listSegment, segmentS };
  },
  data() {
    return {
      columns: [
        {
          title: "Yêu cầu",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Voucher",
          dataIndex: "voucher",
          key: "voucher",
        },
        {
          title: "Số lượng",
          dataIndex: "amount",
          key: "amount",
        },
        {
          title: "Trạng thái",
          dataIndex: "status",
          key: "status",
        },
        {
          title: "Người yêu cầu",
          dataIndex: "user",
          key: "user",
        },
        {
          title: "Ngày tạo",
          dataIndex: "created_at",
          key: "created_at",
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
    this.segmentS.getSegmentAll();
  },
  methods: {
    dateTime(value) {
      return this.$dayjs.utc(value).local().format("DD/MM/YYYY");
    },
    acceptSegment(segment) {
      this.segmentS.acceptSegment(segment.id);
    },
    denySegment(segment) {
      this.segmentS.denySegment(segment.id);
    },
    getCsv(segment) {
      this.segmentS.getCsv(segment.id);
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
