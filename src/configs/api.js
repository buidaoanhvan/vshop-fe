// const url = "https://api-cmsvc.codezip.one";
// const url = "http://192.168.0.16:8888";
const url = "https://api-qr.codezip.one";
const api_link = {
  login: url + "/v1/api/auth/login",
  register: url + "/auth/register",
  user: url + "/auth/user",
  alluser: url + "/auth/alluser",
  shop: url + "/v1/api/shop",
  shop_update: url + "/v1/api/shop/update",
  // supplier: url + "/v1/api/supplier",
  voucher: url + "/v1/api/voucher/view",
  voucher_create: url + "/v1/api/voucher/create",
  voucher_update: url + "/v1/api/voucher/update",
  codevoucher_create: url + "/v1/api/code/create",
  codevoucher_view: url + "/v1/api/code/view",
  codevoucher_detail: url + "/v1/api/code/detail",
  codevoucher_used: url + "/v1/api/code/used",
  // codex: url + "/v1/api/codex",
  segment: url + "/v1/api/segment",
  roles: url + "/roles",
  permissions: url + "/v1/api/permissions",
  role_permissions: url + "/role-permissions",
  upload: url + "/v1/api/upload",
};

export default api_link;
