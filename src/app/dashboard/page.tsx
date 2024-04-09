"use client";
import withAuth from "@/hocs/withAuth";
import api from "@/lib/api";
import { deleteLogInCookie, forcePageRefresh } from "@/lib/authCookies";
import useUserStore from "@/lib/userStore";
import { HomeIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Page() {
  const {user} = useUserStore();
  const router = useRouter();
  useEffect(() => {
    // async function getUserInfo() {
    //   const data = await api().get("/api/user");
    //   console.log(data.data);
    // }
    // getUserInfo();
  }, []);

  console.log(user.name)

  return (
    <main className="flex h-screen w-full items-center gap-4 px-2 py-4">
      <aside className="flex h-full w-64 flex-col gap-2">
        <div className="h-1/4 w-full rounded-lg bg-blue-500">Inmobi {}</div>
        <div className="flex w-full items-center justify-start gap-2 rounded-lg bg-slate-300 p-4">
          <HomeIcon className="h-5 w-5" />
          Menu
        </div>
        <div className="flex w-full items-center justify-start gap-2 rounded-lg bg-slate-300 p-4">
          <HomeIcon className="h-5 w-5" />
          Home
        </div>
        <div className="flex w-full items-center justify-start gap-2 rounded-lg bg-slate-300 p-4">
          <HomeIcon className="h-5 w-5" />
          <Link href="/user/settings">Settings</Link>
        </div>
        <div className="mt-auto flex w-full items-center justify-start gap-2 rounded-lg bg-slate-300 p-4">
          <HomeIcon className="h-5 w-5" />
          <button
            onClick={() => {
              api()
                .post("/logout")
                .then(() => {
                  deleteLogInCookie();
                  //forcePageRefresh();
                  router.push('/auth/login')
                  //maybe just send them back to login since we may not
                  //need the page refresh?
                });
            }}
          >
            Log Out
          </button>
        </div>
      </aside>
      <section className="grid h-full flex-grow grid-cols-2 border">
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </section>
    </main>
  );
}

//export default Page;

export default withAuth(Page);
