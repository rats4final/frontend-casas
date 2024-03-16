import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import Cookies from 'js-cookie';
import { deleteLogInCookie } from "@/lib/authCookies";

//TODO: CHECK AND TRY WITH THE COOKIE INSTEAD OF RELYING ON THE AXIOS ERROR

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
) => {
  const AuthWrapper = (props: object) => {
    const router = useRouter();
    const [authenticated, setAuthenticated] = useState<boolean>(false);

    useEffect(() => {
      const verifyUser = () => {
        //TODO: MAYBE INTERCEPTORS COULD HAVE A USE, INSTEAD OF THIS IMPLEMENTATION
        api()
          .get("/api/user")
          .then((response) => {
            console.log(response.data);
            if(Cookies.get('is_user_logged_in') === 'true'){
              setAuthenticated(true);
            }else{
              deleteLogInCookie();
              router.push('/auth/login')
            }
          })
          .catch((error) => {
            if (error.response.status === 401) {
              console.log(error);
              setAuthenticated(false);
              deleteLogInCookie();
              router.push("/auth/login");
            }
          });
      };
      verifyUser();
    }, [router]);

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
