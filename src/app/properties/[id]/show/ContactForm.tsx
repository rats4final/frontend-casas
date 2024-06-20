"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import api from "@/lib/api";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type ContactFormProps = {
  property: any;
};

const contactFormSchema = z.object({
  name: z.string(),
  email: z.string(),
  message: z.string(),
});

type ContactForm = z.infer<typeof contactFormSchema>;

export default function ContactForm({ property }: ContactFormProps) {
  const contactForm = useForm<ContactForm>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: `Hola quisiera mas informacion sobre la propiedad ${property.title} con direccion ${property.address}`,
    },
  });

  async function onSubmit(values: ContactForm) {
    try {
      await api().get('/sanctum/csrf-cookie');
      await api().post(`/api/contact`, values);
      toast.success("Email enviado con exito");
    } catch (error) {
      toast.error("Hubo un error al enviar el correo");
      console.log(error);
    }
    console.log(values);
  }

  return (
    <Form {...contactForm}>
      <form onSubmit={contactForm.handleSubmit(onSubmit)}>
        <FormField
          control={contactForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="nombre" {...field} />
              </FormControl>
              <FormDescription>
                El nombre de la persona que nos contacta
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={contactForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo Electronico</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormDescription>
                El correo electronico de la persona que nos contacta
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={contactForm.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mensaje</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormDescription>Tu mensaje</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Enviar</Button>
      </form>
    </Form>
  );
}
