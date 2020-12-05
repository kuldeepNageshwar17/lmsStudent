import axios from "axios";

export const USER_REGISTER_URL = "api/auth/user";
export const USER_LOGIN_URL = "api/auth/login";
export const ME_USER_URL = "api/auth/me";
export const USER_LOGOUT_URL = "api/auth/logout";

export const STUDENT_LOGIN_URL = "api/auth/studentLogin";
export const ME_STUDENT_URL = "api/auth/meStudent";
export const STUDENT_LOGOUT_URL = "api/auth/studentLogout";


export function UserRegister(email, fullname,  password,mobile,institute) {
    return axios.post(USER_REGISTER_URL, { email,name:fullname, password,mobile,institute });
}
export function UserLogin(email, password) {
  return axios.post(USER_LOGIN_URL, { email, password });
}
export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_USER_URL);
}
export function LogoutUser() {
  // Authorization head should be fulfilled in interceptor.
  return axios.post(USER_LOGOUT_URL);
}

export function StudentLogin(email, password) {
  return axios.post(STUDENT_LOGIN_URL, { email, password });
}
export function getStudentByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_STUDENT_URL);
}
export function LogoutStudent() {
  // Authorization head should be fulfilled in interceptor.
  return axios.post(STUDENT_LOGOUT_URL);
}
