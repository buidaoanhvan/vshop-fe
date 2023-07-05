// const url = "https://api-cmsvc.codezip.one";
const url = "http://localhost:8888";
const api_link = {
  login: url + "/v1/api/auth/login",
  register: url + "/auth/register",
  user: url + "/auth/user",
  alluser: url + "/auth/alluser",
  shop: url + "/shop",
  supplier: url + "/supplier",
  voucher: url + "/voucher",
  codex: url + "/codex",
  segment: url + "/segment",
  roles: url + "/roles",
  permissions: url + "/permissions",
  role_permissions: url + "/role-permissions",
  upload: url + "/upload",
};

export default api_link;
