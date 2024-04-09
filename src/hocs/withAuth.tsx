import api from "@/lib/api";
import { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import Cookies from "js-cookie";
import useUserStore from "@/lib/userStore";
import { useRouter } from "next/navigation";
import { deleteLogInCookie } from "@/lib/authCookies";

//TODO: CHECK AND TRY WITH THE COOKIE INSTEAD OF RELYING ON THE AXIOS ERROR

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
) => {
  const AuthWrapper = (props: object) => {
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const { user, setUser } = useUserStore();
    const router = useRouter();

    useEffect(() => {
      (async function authPipeline() {
        try {
          if (Cookies.get("is_user_logged_in") === "true") {
            if (!user) {
              const userData = await api().get("/api/user");
              setUser(userData.data);
              setAuthenticated(true);
            }else{
              setAuthenticated(true);
            }
          }else{
            // api().get('/sanctum/csrf-cookie').then(() => {
              //   api().post('/logout');
              // })
                deleteLogInCookie();
                api().post('/logout');

            router.push('/auth/login');
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }, [user, setUser, router]);

    if (authenticated) {
      return <WrappedComponent {...(props as P)} />;
    } else {
      return (
        <ColorRing
          height={150}
          width={150}
          wrapperClass="flex min-h-screen w-screen items-center justify-center"
        />
      );
    }
  };
  return AuthWrapper;
};
export default withAuth;
