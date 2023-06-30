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
        <a-typography-title :level="3">Đối tác</a-typography-title>
        <AddSupplier></AddSupplier>
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
          :data-source="listSupplier"
          :pagination="false"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'name'">
              {{ record.name }}
            </template>
            <template v-else-if="column.key === 'action'">
              <span>
                <EditSupplier :supplier="record"></EditSupplier>
                <a-divider type="vertical" />
                <a @click="deleteSupplier(record.id)">Xóa</a>
              </span>
            </template>
          </template>
        </a-table>
      </div>
    </div>
  </a-layout-content>
</template>
<script>
import AddSupplier from "../components/Supplier/AddSupplier.vue";
import EditSupplier from "../components/Supplier/EditSupplier.vue";
import { storeToRefs } from "pinia";
import { supplierStore } from "@/store";

export default {
  components: { AddSupplier, EditSupplier },
  setup() {
    const supplier = supplierStore();
    const { listSupplier } = storeToRefs(supplier);
    return { supplier, listSupplier };
  },
  data() {
    return {
      columns: [
        {
          title: "Đối tác",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Email",
          dataIndex: "email",
          key: "email",
        },
        {
          title: "Liên hệ",
          dataIndex: "phone",
          key: "phone",
        },
        {
          title: "Hành động",
          key: "action",
        },
      ],
    };
  },
  created() {
    this.supplier.getSupplierAll();
  },

  methods: {
    deleteSupplier(id) {
      this.supplier.deleteSupplier(id);
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
</style>
