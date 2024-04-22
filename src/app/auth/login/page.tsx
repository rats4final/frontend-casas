"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/lib/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { TLoginSchema, loginSchema } from "@/lib/types";
import { useRouter } from "next/navigation";
import { setLogInCookie } from "@/lib/authCookies";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import TwoFaLogin from "@/components/auth/TwoFALogin";
import useUserStore from "@/lib/userStore";
import Cookies from "js-cookie";
import PasswordInput from "./PasswordInput";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

export default function Page() {
  const {
    setValue,
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TLoginSchema>({ resolver: zodResolver(loginSchema),
    defaultValues: {
      remember: false
    }
   });
  const [twoFA, setTwoFA] = useState(false);
  const router = useRouter();

  //console.log(errors)

  function onSubmit(data: TLoginSchema) {
    console.log(data);
    api()
      .get("/sanctum/csrf-cookie")
      .then(() => {
        api()
          .post("/api/login", data)
          .catch((error) => {
            setError("password", {
              type: "server",
              message: error.response.data.message,
            });
            setError("email", {
              type: "server",
              message: error.response.data.message,
            });
            console.log(error);
            return Promise.reject(error);
          })
          .then((response) => {
            if (response.data.error) {
              console.log(response.data.error);
            } else {
              if (response.data.two_factor === true) {
                console.log(response);
                toast.info("You need to provide 2fa passcode")
                setTwoFA(true);
                //maybe add a toast
              } else {
                console.log("success");
                toast.success("Logged in succesfully")
                setLogInCookie();
                router.push("/dashboard");
              }
            }
          })
          .catch((e) => {
            toast.error("Something went wrong");
          });
      });
  }

  function handleTwoFAFailure() {
    setTwoFA(false);
    toast.error("You entered the wrong code");
  }

  const handleCheckboxChange = (checked: boolean | "indeterminate") => {
    if (typeof checked === "boolean") {
      setValue("remember", checked);
    }
  };

  //TODO: ADD THIS MAYBE IN A LAYOUT
  // if (Cookies.get("is_user_logged_in") === "true") {
  //   router.push('/dashboard');
  // }
  // rethink this implementation, maybe check the user in the store?

  return (
    <main className="flex min-h-screen items-center justify-center">
      {twoFA ? (
        <TwoFaLogin
          onFail={handleTwoFAFailure}
          onVerify={() => {
            setLogInCookie();
            router.push("/dashboard");
            //maybe define an inner function for login
          }}
        />
      ) : (
        <Card className="w-80">
          <CardHeader className="flex items-center justify-center">
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
            >
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("email")}
                  type="email"
                  id="email"
                  autoFocus
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="flex items-center justify-evenly">
                  <PasswordInput {...register("password")} />
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="flex gap-2 items-center">
                Remember Me
                <Checkbox
                  {...register("remember")}
                  id="remember"
                  onCheckedChange={handleCheckboxChange}
                />
              </div>
              <Button disabled={isSubmitting}>Login</Button>
              <Link
                href="http://localhost:8000/auth/google/redirect"
                className={buttonVariants({ variant: "default" })}
              >
                <svg
                  className="mr-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  ></path>
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  ></path>
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                </svg>
                Log In With Google
              </Link>
            </form>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
