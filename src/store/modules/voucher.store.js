import { defineStore } from "pinia";
import Axios from "axios";
import api_link from "@/configs/api";
import { message } from "ant-design-vue";

export const voucherStore = defineStore({
  id: "voucher",
  state: () => ({
    listVoucher: [],
  }),

  actions: {
    async getVoucherAll() {
      try {
        const res = await Axios.get(api_link.voucher);
        if (res.data.statusCode == 200) {
          this.listVoucher = res.data.data;
        } else {
          // console.log(res.data.message);
        }
      } catch (error) {
        // console.log(error);
      }
    },

    async addVoucher(
      brandId,
      supplierId,
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
        const res = await Axios.post(api_link.voucher, {
          brandId,
          supplierId,
          title,
          description,
          image,
          discount_value,
          discount_type,
          max_discount,
          start_time,
          end_time,
        });
        if (res.data.statusCode == 200) {
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
      brandId,
      supplierId,
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
        const res = await Axios.patch(api_link.voucher + "/" + id, {
          brandId,
          supplierId,
          title,
          description,
          image,
          discount_value,
          discount_type,
          max_discount,
          start_time,
          end_time,
        });
        if (res.data.statusCode == 200) {
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

    async deleteVoucher(id) {
      try {
        const res = await Axios.delete(api_link.voucher + "/" + id);
        if (res.data.statusCode == 200) {
          this.getVoucherAll();
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
