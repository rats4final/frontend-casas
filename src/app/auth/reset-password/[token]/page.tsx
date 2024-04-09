import api from "@/lib/api";
import { redirect } from "next/navigation";
import { z } from "zod";

const resetPasswordSchema = z.object({
  email: z.string(),
  password: z.string(),
  password_confirmation: z.string(),
  token: z.string(),
});

export default function Page({
  params,
  searchParams,
}: {
  params: { token: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  console.log(params);
  console.log(searchParams);

  async function send(formData: FormData) {
    "use server";
    const {email, password, password_confirmation, token } = resetPasswordSchema.parse({
      email: searchParams.email,
      password: formData.get("password"),
      password_confirmation: formData.get("password_confirmation"),
      token: params.token,
    });
    try {
      await api().get("/sanctum/csrf-cookie");
      await api().post("/api/reset-password", {
        email: email,
        password: password,
        password_confirmation: password_confirmation,
        token: token,
      });
    } catch (error) {
      console.log(error)
    } finally {
      redirect("/auth/login");
    }
  }

  return (
    <main>
      <p>Hellooo</p>
      <form action={send}>
        <input className="border" type="text" name="password" />
        <input className="border" type="text" name="password_confirmation"/>
        <button type="submit">Change</button>
      </form>
    </main>
  );
}
