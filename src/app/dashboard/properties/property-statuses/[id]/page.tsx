"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

const propertyStatusSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});
type TpropertyStatusSchema = z.infer<typeof propertyStatusSchema>;

export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const updatepropertyStatusForm = useForm<TpropertyStatusSchema>({
    resolver: zodResolver(propertyStatusSchema),
    defaultValues: {
      id: id,
      name: "",
      description: "",
      updated_at: "",
      created_at: "",
    },
  });

  function onSubmit(data: TpropertyStatusSchema) {
    api().put(`/api/property-statuses/${id}`, data).then(() => {
      console.log("niceee")
    })
  }

  useEffect(() => {
    function getPropertyStatus(id: string) {
      api()
        .get(`/api/property-statuses/${id}`)
        .then((response) => {
          updatepropertyStatusForm.setValue('id', id);
          updatepropertyStatusForm.setValue("name", response.data.data.name);
          updatepropertyStatusForm.setValue(
            "description",
            response.data.data.description,
          );
        });
    }
    getPropertyStatus(id);
  }, [id,updatepropertyStatusForm]);

  console.log(updatepropertyStatusForm.formState.errors)
  return (
    <div>
      <Form {...updatepropertyStatusForm}>
        <form onSubmit={updatepropertyStatusForm.handleSubmit(onSubmit)}>
          <FormField
            control={updatepropertyStatusForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="nombre" {...field} />
                </FormControl>
                <FormDescription>
                  El nombre del estado en la que se puede encontrar una propiedad
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={updatepropertyStatusForm.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripcion</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="descripcion" {...field} />
                </FormControl>
                <FormDescription>La descripcion del estado</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Guardar</Button>
        </form>
      </Form>
    </div>
  );
}
