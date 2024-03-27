import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import api from "@/lib/api";
import { useEffect } from "react";
import { toast } from "sonner";

const profileInfoSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

type TprofileInfoSchema = z.infer<typeof profileInfoSchema>;

export default function ProfileInfo({user}) {
  const form = useForm<TprofileInfoSchema>({
    resolver: zodResolver(profileInfoSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({ name: user.name, email: user.email });
    }
  }, [user, form]);

  

  function onSubmit(data: TprofileInfoSchema){
    console.log(data)
    api().put('/api/user/profile-information', data).then(() => {
      toast.success("Values updated correctly")
    }).catch((errors) => {
      console.log(errors);
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field}/>
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" {...field}/>
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}
