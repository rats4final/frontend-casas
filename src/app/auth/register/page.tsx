"use client"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const registerFormSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    password_confirmation: z.string()
})


export default function Page() {

    const form = useForm();

    function onSubmit(){
        
    }

  return (
    <main>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="name" {...field}/>
                            </FormControl>
                            <FormDescription>
                                Your real full name.
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button type="submit" >Submit</Button>
            </form>
        </Form>
    </main>
  )
}
