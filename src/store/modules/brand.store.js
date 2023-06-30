import { defineStore } from "pinia";
import Axios from "axios";
import api_link from "@/configs/api";
import { message } from "ant-design-vue";

export const brandStore = defineStore({
  id: "brand",
  state: () => ({
    listBrand: [],
  }),

  actions: {
    async getBrandAll() {
      try {
        const res = await Axios.get(api_link.brand);
        if (res.data.statusCode == 200) {
          this.listBrand = res.data.data;
        } else {
          // console.log(res.data.message);
        }
      } catch (error) {
        // console.log(error);
      }
    },

    async addBrand(name, logo) {
      try {
        const res = await Axios.post(api_link.brand, { name, logo });
        if (res.data.statusCode == 200) {
          this.getBrandAll();
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

    async updateBrand(id, name, logo) {
      try {
        const res = await Axios.patch(api_link.brand + "/" + id, {
          name,
          logo,
        });
        if (res.data.statusCode == 200) {
          this.getBrandAll();
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

    async deleteBrand(id) {
      try {
        const res = await Axios.delete(api_link.brand + "/" + id);
        if (res.data.statusCode == 200) {
          this.getBrandAll();
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
