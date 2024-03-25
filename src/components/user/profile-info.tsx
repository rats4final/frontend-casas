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

const profileInfoSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

type TprofileInfoSchema = z.infer<typeof profileInfoSchema>;

export default function ProfileInfo() {
  const form = useForm<TprofileInfoSchema>({
    resolver: zodResolver(profileInfoSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  function onSubmit(){

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
        {/* <FormField /> */}
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}
