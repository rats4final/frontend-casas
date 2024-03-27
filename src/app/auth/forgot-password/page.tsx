"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import api from "@/lib/api";

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

type TforgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export default function Page() {
  const [emailSent, setEmailSent] = useState(false);
  const form = useForm<TforgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: TforgotPasswordSchema) {
    api().get('/sanctum/csrf-cookie').then(() => {
      api().post('/api/forgot-password', data).then(() => {
        setEmailSent(true);
      }).catch((errors) => {
        console.log(errors);
        setEmailSent(false);
        form.reset();
      })
    })
  }

  return (
    <main>
      {emailSent ? (
        <div>
          Instructions to reset your password have been sent to{" "}
          {form.getValues("email")}
        </div>
      ) : (
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Reset</Button>
            </form>
          </Form>
        </div>
      )}
    </main>
  );
}
