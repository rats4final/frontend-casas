import Cookies from "js-cookie";

export function setLogInCookie() {
  Cookies.set("is_user_logged_in", "true", {
    expires: 86400,
    sameSite: "lax",
  });
}
export function deleteLogInCookie() {
  if (typeof window !== 'undefined') {
    Cookies.remove("is_user_logged_in", { expires: 86400, sameSite: "lax" });
  }
}
export function forcePageRefresh() {
    if (typeof window !== 'undefined') {
        window.location.reload();
    }
}
