import { defineStore } from "pinia";
import Axios from "axios";
import api_link from "@/configs/api";
import { message } from "ant-design-vue";

export const voucherStore = defineStore({
  id: "voucher",
  state: () => ({
    listVoucher: [],
    listCode: [],
    codeDetail: {},
  }),

  actions: {
    async getVoucherAll() {
      try {
        const res = await Axios.get(api_link.voucher);
        // console.log(res.data);
        if (res.data.code == "00") {
          this.listVoucher = res.data.data;
        } else {
          // console.log(res.data.message);
        }
      } catch (error) {
        // console.log(error);
      }
    },

    async addVoucher(
      shop_id,
      title,
      description,
      image,
      discount_value,
      discount_type,
      max_discount,
      start_time,
      end_time
    ) {
      try {
        const res = await Axios.post(api_link.voucher_create, {
          shop_id,
          title,
          description,
          image,
          discount_value,
          discount_type,
          max_discount,
          start_time,
          end_time,
        });
        // console.log(res);
        if (res.data.code == "00") {
          this.getVoucherAll();
          message.success("Thành công");
        } else {
          message.warning(res.data.message);
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

    async updateVoucher(
      id,
      shop_id,
      title,
      description,
      image,
      discount_value,
      discount_type,
      max_discount,
      start_time,
      end_time
    ) {
      try {
        const res = await Axios.patch(api_link.voucher_update + "/" + id, {
          shop_id,
          title,
          description,
          image,
          discount_value,
          discount_type,
          max_discount,
          start_time,
          end_time,
        });
        if (res.data.code == "00") {
          this.getVoucherAll();
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

    async createCodeVoucher(voucher_id, quantity) {
      try {
        const res = await Axios.post(api_link.codevoucher_create, {
          voucher_id,
          quantity,
        });
        if (res.data.code == "00") {
          message.success(res.data.message);
        } else {
          message.warning(res.data.message);
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

    async getCodeVoucher(voucher_id, page) {
      try {
        const res = await Axios.post(api_link.codevoucher_view, {
          voucher_id,
          page,
        });
        // console.log(res.data);
        if (res.data.code == "00") {
          this.listCode = [...this.listCode, ...res.data.data];
        } else {
          // console.log(res.data.message);
        }
      } catch (error) {
        // console.log(error);
      }
    },

    async getCodeDetail(codex) {
      try {
        const res = await Axios.post(api_link.codevoucher_detail, {
          codex,
        });
        // console.log(res.data);
        if (res.data.code == "00") {
          this.codeDetail = res.data.data;
          return res.data;
        } else {
          return res.data;
          // console.log(res.data.message);
        }
      } catch (error) {
        // console.log(error);
      }
    },

    async updateIsUsed(codex) {
      try {
        const res = await Axios.post(api_link.codevoucher_used, { codex });
        if (res.data.code == "00") {
          message.success("Sử dụng voucher thành công");
          // this.codeDetail = res.data.data;
          return res.data;
        } else {
          message.error("Vui lòng thử lại sau");
          return res.data;
          // console.log(res.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    },

    // async deleteVoucher(id) {
    //   try {
    //     const res = await Axios.delete(api_link.voucher + "/" + id);
    //     if (res.data.statusCode == 200) {
    //       this.getVoucherAll();
    //       message.success("Xóa thành công");
    //     } else {
    //       message.warning("Vui lòng kiểm tra lại");
    //     }
    //   } catch (error) {
    //     message.error("Vui lòng thử lại sau");
    //   }
    // },
  },
});
