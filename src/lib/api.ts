"use client"
import axios from "axios";
export default function api() {

  const api = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
    withCredentials: true,
    withXSRFToken: true,
  });

    // api.interceptors.response.use(
    //   (response) => response,
    //   (error) => {
    //     if (error.response.status === 401) {
    //       return Promise.reject();
    //     }

    //     return Promise.reject(error);
    //   },
    // );
  return api;
}
