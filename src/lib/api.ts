import axios from "axios";
import { deleteLogInCookie } from "./authCookies";
export default function api() {


  const api = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
    withCredentials: true,
    withXSRFToken: true,
  });

    api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          if(window){
            deleteLogInCookie();
            console.log(error)
            window.location.replace('http://localhost:3000/auth/login');
            return Promise.reject();
          }
        }
        return Promise.reject(error);
      },
    );
  return api;
}
