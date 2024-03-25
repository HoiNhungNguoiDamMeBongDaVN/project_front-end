// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: "http://localhost:8080/api/v1/",
  apiLoginLogoutCustomer: 'http://localhost:8080/api/v2/',
  sso_login: "http://localhost:8083/login",
  sso_logout: "http://localhost:8083/api/v1/logout",
  sso_get_account: "http://localhost:8083/api/v1/account",
  sso_veryfy_token: "http://localhost:8083/verify-token",
  sso_current_url: "http://localhost:4200/admins/dashboard"
  // sso_login: "http://localhost:8080/login",
  // sso_logout: "http://localhost:8080/api/v1/logout",
  // sso_get_account: "http://localhost:8080/api/v1/account",
  // sso_veryfy_token: "http://localhost:8080/verify-token",
  // sso_current_url: "http://localhost:4200/admins/dashboard"
};

