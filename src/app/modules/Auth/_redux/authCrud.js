import axios from "axios";

export const LOGIN_URL = "api/auth/StudentLogin";
export const LOGOUT_USER = "api/auth/studentLogout";
export const REGISTER_URL = "api/auth/register";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";

export const ME_URL = "api/auth/meStudent";

export function login(email, password) {
  return axios.post(LOGIN_URL, { email, password });
}

export function register(email, fullname, username, password) {
  return axios.post(REGISTER_URL, { email, fullname, username, password });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken(authToken) {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(`api/auth/me/${authToken}`);
}

export function LogoutUser() {
  // Authorization head should be fulfilled in interceptor.
  return axios.post(LOGOUT_USER);
}
