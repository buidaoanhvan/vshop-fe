import { defineStore } from "pinia";
import Axios from "axios";
import api_link from "@/configs/api";
import { message } from "ant-design-vue";

export const shopStore = defineStore({
  id: "shop",
  state: () => ({
    listShop: [],
  }),

  actions: {
    async getShopAll() {
      try {
        const res = await Axios.get(api_link.shop);
        if (res.data.statusCode == 200) {
          this.listShop = res.data.data;
        } else {
          // console.log(res.data.message);
        }
      } catch (error) {
        // console.log(error);
      }
    },

    async addShop(name, logo) {
      try {
        const res = await Axios.post(api_link.shop, { name, logo });
        if (res.data.statusCode == 200) {
          this.getShopAll();
          message.success("Thêm Cửa Hàng Thành công");
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

    async updateShop(id, name, logo) {
      try {
        const res = await Axios.patch(api_link.shop + "/" + id, {
          name,
          logo,
        });
        if (res.data.statusCode == 200) {
          this.getShopAll();
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

    async deleteShop(id) {
      try {
        const res = await Axios.delete(api_link.shop + "/" + id);
        if (res.data.statusCode == 200) {
          this.getShopAll();
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
