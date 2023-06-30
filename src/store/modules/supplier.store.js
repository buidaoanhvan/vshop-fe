import { defineStore } from "pinia";
import Axios from "axios";
import api_link from "@/configs/api";
import { message } from "ant-design-vue";

export const supplierStore = defineStore({
  id: "supplier",
  state: () => ({
    listSupplier: [],
  }),

  actions: {
    async getSupplierAll() {
      try {
        const res = await Axios.get(api_link.supplier);
        if (res.data.statusCode == 200) {
          this.listSupplier = res.data.data;
        } else {
          // console.log(res.data.message);
        }
      } catch (error) {
        // console.log(error);
      }
    },

    async addSupplier(name, email, phone) {
      try {
        const res = await Axios.post(api_link.supplier, { name, email, phone });
        if (res.data.statusCode == 200) {
          this.getSupplierAll();
          message.success("Thành công");
        } else {
          message.warning("Vui lòng kiểm tra lại");
        }
      } catch (error) {
        if (error.response.status === 400) {
          error.response.data.message.forEach((element) => {
            message.error(element);
          });
        } else {
          message.error("Vui lòng thử lại sau");
        }
      }
    },

    async updateSupplier(id, name, email, phone) {
      try {
        const res = await Axios.patch(api_link.supplier + "/" + id, {
          name,
          email,
          phone,
        });
        if (res.data.statusCode == 200) {
          this.getSupplierAll();
          message.success("Cập nhật thành công");
        } else {
          message.warning("Vui lòng kiểm tra lại");
        }
      } catch (error) {
        if (error.response.status === 400) {
          error.response.data.message.forEach((element) => {
            message.error(element);
          });
        } else {
          message.error("Vui lòng thử lại sau");
        }
      }
    },

    async deleteSupplier(id) {
      try {
        const res = await Axios.delete(api_link.supplier + "/" + id);
        if (res.data.statusCode == 200) {
          this.getSupplierAll();
          message.success("Xóa thành công");
        } else {
          message.warning("Vui lòng kiểm tra lại");
        }
      } catch (error) {
        message.error("Vui lòng thử lại sau");
      }
    },
  },
});
