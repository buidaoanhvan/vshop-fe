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
        if (res.data.code == "00") {
          this.listShop = res.data.data;
        } else {
          message.error("Lỗi hệ thống vui lòng thử lại sau");
        }
      } catch (error) {
        message.error("Lỗi hệ thống vui lòng thử lại sau");
      }
    },

    async addShop(
      email,
      password,
      fullname,
      phone,
      shop_name,
      shop_logo,
      shop_address
    ) {
      try {
        const res = await Axios.post(api_link.shop, {
          email,
          password,
          fullname,
          phone,
          shop_name,
          shop_logo,
          shop_address,
        });
        if (res.data.code == "00") {
          message.success("Thêm Cửa Hàng Thành công");
          this.getShopAll();
          return res.data.code;
        } else if (res.data.code == "01") {
          message.warning("Email đã tồn tại");
        } else {
          message.warning("Vui lòng kiểm tra lại");
        }
      } catch (error) {
        if (error.response.data.code == "04") {
          error.response.data.data.forEach((element) => {
            message.warning(element.msg);
          });
        } else {
          message.error("Lỗi hệ thống vui lòng thử lại sau");
        }
      }
    },

    async updateShop(id, name, address, status, logo) {
      try {
        const res = await Axios.patch(api_link.shop_update + "/" + id, {
          name,
          address,
          status,
          logo,
        });
        if (res.data.code == "00") {
          this.getShopAll();
          return res.data.code;
          // message.success("Cập nhật thành công");
        } else {
          message.warning("Vui lòng kiểm tra lại");
        }
      } catch (error) {
        if (error.response.data.code == "04") {
          error.response.data.data.forEach((element) => {
            message.warning(element.msg);
          });
        } else {
          message.error("Vui lòng thử lại sau");
        }
      }
    },

    async deleteShop(id) {
      try {
        const res = await Axios.delete(api_link.shop_delete + "/" + id);
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
