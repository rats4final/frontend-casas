import axios from "axios";
import { deleteLogInCookie } from "./authCookies";
export default function api() {


  const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
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
            window.location.replace(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/auth/login`);
            return Promise.reject();
          }
        }
        return Promise.reject(error);
      },
    );
  return api;
}
