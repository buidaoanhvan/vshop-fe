import { defineStore } from "pinia";
import Axios from "axios";
import api_link from "@/configs/api";
import { message } from "ant-design-vue";
// import router from "../../router/index";

export const userStore = defineStore({
  id: "user",
  state: () => ({
    listUser: [],
    rolesList: [],
    permissionsList: [],
    permissionsCheck: [],
  }),

  actions: {
    async getUserAll() {
      try {
        const res = await Axios.post(api_link.alluser);
        if (res.data.code == 200) {
          this.listUser = res.data.data;
        } else {
          // console.log(res.data.message);
        }
      } catch (error) {
        // console.log(error);
      }
    },
    async getPermissionsAll() {
      try {
        const res = await Axios.get(api_link.permissions);
        if (res.data.statusCode == 200) {
          this.permissionsList = [];
          res.data.data.forEach((i) => {
            i.value = i.id;
            i.label = i.name;
            this.permissionsList.push(i);
          });
        } else {
          // console.log(res.data.message);
        }
      } catch (error) {
        // console.log(error);
      }
    },
    async getRolesAll() {
      try {
        const res = await Axios.get(api_link.roles);
        if (res.data.statusCode == 200) {
          this.rolesList = res.data.data;
        } else {
          // console.log(res.data.message);
        }
      } catch (error) {
        // console.log(error);
      }
    },
    async addUser(fullname, email, phone, password, role_id) {
      try {
        const res = await Axios.post(api_link.register, {
          fullname,
          email,
          phone,
          password,
          role_id,
        });
        if (res.data.code == 200) {
          this.getUserAll();
          message.success("Tạo tài khoản thành công");
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
    async addRoles(name, guard_name) {
      try {
        const res = await Axios.post(api_link.roles, {
          name,
          guard_name,
        });
        if (res.data.statusCode == 200) {
          this.getRolesAll();
          message.success("Tạo roles thành công");
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
    async getPermissionsRoles(id) {
      try {
        const res = await Axios.post(
          api_link.role_permissions + "/permissions/" + id
        );
        if (res.data.statusCode == 200) {
          this.permissionsCheck = [];
          res.data.data.forEach((i) => {
            this.permissionsCheck.push(i.permission_id);
          });
        }
      } catch (error) {
        // console.log(error);
      }
    },
    async updatePermissionRole(roleId, listPermission) {
      try {
        const res = await Axios.patch(api_link.role_permissions, {
          roleId,
          listPermission,
        });
        if (res.data.statusCode == 200) {
          message.success("Cập nhật thành công");
        } else {
          message.warning("Vui lòng thử lại sau");
        }
      } catch (error) {
        message.warning("Vui lòng thử lại sau");
      }
    },
  },
});
