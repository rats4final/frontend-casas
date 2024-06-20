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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/data-table";
import usePropertyStatuses from "@/hooks/usePropertyStatuses";
import { columns } from "./columns";

export default function Page() {
  const { propertyStatusForm, propertyStatusesQuery, onSubmit } =
    usePropertyStatuses();

  return (
    <main>
      {/* investigate why it needs an array */}
      <DataTable
        columns={columns}
        data={propertyStatusesQuery.data?.data?.data ?? []}
      />
      <Form {...propertyStatusForm}>
        <form onSubmit={propertyStatusForm.handleSubmit(onSubmit)}>
          <FormField
            control={propertyStatusForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="nombre" {...field} />
                </FormControl>
                <FormDescription>
                  El nombre del estado en el que puede estar una propiedad
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={propertyStatusForm.control}
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
    </main>
  );
}
