import { defineStore } from "pinia";
import Axios from "axios";
import api_link from "@/configs/api";
import { message } from "ant-design-vue";
import SaveAs from "file-saver";

export const segmentStore = defineStore({
  id: "segment",
  state: () => ({
    listSegment: [],
  }),

  actions: {
    async getSegmentAll() {
      try {
        const res = await Axios.get(api_link.segment);
        if (res.data.statusCode == 200) {
          this.listSegment = res.data.data;
          // console.log(this.listSegment);
        } else {
          // console.log(res.data.message);
        }
      } catch (error) {
        // console.log(error);
      }
    },

    async addSegment(voucher_id, name, amount) {
      try {
        const res = await Axios.post(api_link.segment, {
          voucher_id,
          name,
          amount,
        });
        if (res.data.statusCode == 200) {
          message.success("Tạo yêu cầu thành công");
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

    async acceptSegment(id) {
      try {
        const res = await Axios.post(api_link.segment + "/accept/" + id);
        if (res.data.statusCode == 200) {
          this.getSegmentAll();
          message.success("Duyệt thành công");
        } else {
          message.warning(res.data.message);
        }
      } catch (error) {
        message.error("Vui lòng thử lại sau");
      }
    },

    async denySegment(id) {
      try {
        const res = await Axios.post(api_link.segment + "/deny/" + id);
        if (res.data.statusCode == 200) {
          this.getSegmentAll();
          message.success("Từ chối thành công");
        } else {
          message.warning(res.data.message);
        }
      } catch (error) {
        message.error("Vui lòng thử lại sau");
      }
    },

    async getCsv(id) {
      try {
        await Axios.get(api_link.segment + "/csv/" + id).then((response) => {
          if (response.data.statusCode == 400) {
            message.warning(response.data.message);
            return;
          }
          SaveAs(new Blob([response.data], { type: "text/csv" }), "data.csv", {
            autoBOM: false,
          });
        });
      } catch (error) {
        message.error("Vui lòng thử lại sau");
      }
    },
  },
});
