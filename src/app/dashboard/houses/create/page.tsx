"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
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
import api from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const createHouseFormSchema = z.object({
  property_id: z.number().min(1),
  floor_number: z.coerce.number().min(1),
  building_name: z.string().nullable(),
  balcony_number: z.coerce.number(),
  pets_allowed: z.boolean(),
});

type CreateHouseForm = z.infer<typeof createHouseFormSchema>;

export default function CreateHousePage() {
  const createHouseForm = useForm<CreateHouseForm>({
    resolver: zodResolver(createHouseFormSchema),
    defaultValues: {
      floor_number: 0,
      building_name: "",
      balcony_number: 0,
      pets_allowed: false,
    },
  });

  const queryClient = useQueryClient();
  const router = useRouter();
  const createHouseMutation = useMutation({
    mutationFn: async (data: CreateHouseForm) => {
      const response = await api().post("/api/houses", data);
      return response.data.data;
    },
    onError: (error) => {
      console.log(error);
      toast.error("There was an error while creating a house");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["houses"] });
      toast.success("House created succesfully");
      router.push("/dashboard/houses");
    },
  });

  function onSubmit(values: CreateHouseForm) {
    console.log(values);
    createHouseMutation.mutate(values);
  }

  const propertiesQuery = useQuery({
    queryKey: ["properties-without-house"],
    queryFn: async () => await api().get("/api/properties-without-house"),
  });

  const properties = propertiesQuery?.data?.data?.data ?? [];

  if (propertiesQuery.isLoading) return <h1>Loading for properties data</h1>;

  return (
    <div>
      <Form {...createHouseForm}>
        <form
          onSubmit={createHouseForm.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <FormField
            control={createHouseForm.control}
            name="floor_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numero de pisos</FormLabel>
                <FormControl>
                  <Input placeholder="floors" type="number" {...field} />
                </FormControl>
                <FormDescription>
                  El total de pisos que tiene la casa
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={createHouseForm.control}
            name="balcony_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numero de balcones</FormLabel>
                <FormControl>
                  <Input placeholder="floors" type="number" {...field} />
                </FormControl>
                <FormDescription>
                  El numero total de balcones con el que cuenta la casa
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={createHouseForm.control}
            name="property_id"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Propiedad</FormLabel>
                <Popover modal={true}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value
                          ? properties.find(
                              (property) => property.id === field.value,
                            )?.title
                          : "Seleccione una propiedad"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search property..." />
                      <CommandEmpty>No se encontro una propiedad</CommandEmpty>
                      <CommandGroup>
                        {properties.map((property) => (
                          <CommandItem
                            value={property.id}
                            key={property.id}
                            onSelect={() => {
                              createHouseForm.setValue(
                                "property_id",
                                property.id,
                              );
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                property.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {property.title}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Esta es la propiedad con la que se va a relacionar la casa.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={createHouseForm.control}
            name="pets_allowed"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Se permiten mascotas?</FormLabel>
                  <FormDescription>El propietario permite mascotas?</FormDescription>
                </div>
              </FormItem>
            )}
          />
          <Button type="submit">Guardar</Button>
        </form>
      </Form>
    </div>
  );
}
