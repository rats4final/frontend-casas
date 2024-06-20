"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FilePond, registerPlugin } from "react-filepond";


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
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import usePropertyStatuses from "@/hooks/usePropertyStatuses";
import useAgreementTypes from "@/hooks/useAgreementTypes";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMutation } from "@tanstack/react-query";
import { createProperty } from "@/lib/data";
import { toast } from "sonner";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import api from "@/lib/api";

const states = [
  { label: "La Paz", value: "La Paz" },
  { label: "Oruro", value: "Oruro" },
  { label: "Potosí", value: "Potosí" },
  { label: "Cochabamba", value: "Cochabamba" },
  { label: "Chuquisaca", value: "Chuquisaca" },
  { label: "Tarija", value: "Tarija" },
  { label: "Santa Cruz", value: "Santa Cruz" },
  { label: "Beni", value: "Beni" },
  { label: "Pando", value: "Pando" },
];


export default function CreatePropertyPage({property}: {property: object}) {

  const editPropertyFormSchema = z.object({
    id: z.coerce.number(),
    title: z.string(),
    description: z.string(),
    address: z.string(),
    longitude: z.string().optional(),
    latitude: z.string().optional(),
    price: z.string(),
    property_status_id: z.coerce.string(),
    agreement_type_id: z.coerce.string().optional(),
    agent: z.string().nullable().optional(),
    zone: z.string(),
    city: z.string(),
    state: z.string(),
    total_area: z.string(),
    year_built: z.string(),
    floor_plan: z.string().optional(),
    has_natural_gas: z.boolean(),
    has_electricity: z.boolean(),
    has_water: z.boolean(),
    sketchfab_id: z.string().optional(),
  });

  type EditPropertyForm = z.infer<typeof editPropertyFormSchema>;

  const editPropertyForm = useForm<EditPropertyForm>({
    resolver: zodResolver(editPropertyFormSchema),
    defaultValues: {
      id: property.id,
      title: property.title,
      description: property.description,
      address: property.address,
      longitude: property.longitude,
      latitude: property.latitude,
      price: property.price,
      property_status_id: property.property_status_id,
      agreement_type_id: property.agreement_type_id,
      agent: property.agent,
      zone: property.zone,
      city: property.city,
      state: property.state,
      total_area: property.total_area,
      year_built: property.year_built,
      floor_plan: property.floor_plan,
      has_electricity: property.has_electricity,
      has_natural_gas: property.has_natural_gas,
      has_water: property.has_water,
      sketchfab_id: property.sketchfab_id
    },
  });

  const editPropertyMutation = useMutation({
    mutationFn: async (data:EditPropertyForm) => {
      const response = await api().put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/properties/${data.id}`,data)
      return response.data;
    },
    onSuccess: () => {
      toast.success("Propiedad editada correctamente");
      //invalidate query
    },
    onError: (error) => {
      console.log(error);
      toast.error("Hubo un error al editar la propiedad");
    },
  });

  console.log(editPropertyForm.formState.errors);

  function onSubmit(values: EditPropertyForm) {
    editPropertyMutation.mutate(values);
  }

  const { propertyStatusesQuery } = usePropertyStatuses();
  const { agreementTypesQuery } = useAgreementTypes();

  const propertyStatuses = propertyStatusesQuery?.data?.data?.data ?? [];
  const agreementTypes = agreementTypesQuery?.data?.data?.data ?? [];

  return (
    <ScrollArea className="h-full p-4">
      <main>
        <Form {...editPropertyForm}>
          <form onSubmit={editPropertyForm.handleSubmit(onSubmit)}>
            <FormField
              control={editPropertyForm.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titulo</FormLabel>
                  <FormControl>
                    <Input placeholder="titulo" {...field} />
                  </FormControl>
                  <FormDescription>
                    Este es el nombre o titulo de la propiedad
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={editPropertyForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripcion</FormLabel>
                  <FormControl>
                    <Input placeholder="descripcion" {...field} />
                  </FormControl>
                  <FormDescription>
                    Esta es la descripcion de la propiedad
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={editPropertyForm.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Direccion</FormLabel>
                  <FormControl>
                    <Input placeholder="direccion" {...field} />
                  </FormControl>
                  <FormDescription>
                    La direccion de la propiedad
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={editPropertyForm.control}
              name="longitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Longitud</FormLabel>
                  <FormControl>
                    <Input placeholder="longitud" {...field} />
                  </FormControl>
                  <FormDescription>
                    Coordenada de longitud de la propiedad
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={editPropertyForm.control}
              name="latitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Latitud</FormLabel>
                  <FormControl>
                    <Input placeholder="latitud" {...field} />
                  </FormControl>
                  <FormDescription>
                    Coordenada de latitud de la propiedad
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={editPropertyForm.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio</FormLabel>
                  <FormControl>
                    <Input placeholder="Precio" {...field} />
                  </FormControl>
                  <FormDescription>Precion en Bs de la propiedad</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={editPropertyForm.control}
              name="property_status_id"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Estado</FormLabel>
                  <Popover modal={true}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value
                            ? propertyStatuses.find(
                                (propertyStatus) =>
                                  propertyStatus.id === field.value,
                              )?.name
                            : "Seleccione un estado"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Buscar Estado..." />
                        <CommandEmpty>No se encontro un estado</CommandEmpty>
                        <CommandGroup>
                          {propertyStatuses.map((propertyStatus) => (
                            <CommandItem
                              value={propertyStatus.id}
                              key={propertyStatus.id}
                              onSelect={() => {
                                editPropertyForm.setValue(
                                  "property_status_id",
                                  propertyStatus.id,
                                );
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  propertyStatus.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {propertyStatus.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <FormField
              control={editPropertyForm.control}
              name="agreement_type_id"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Tipo de Acuerdo</FormLabel>
                  <Popover modal={true}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value
                            ? agreementTypes.find(
                                (agreementType) =>
                                  agreementType.id === field.value,
                              )?.name
                            : "Seleccione un Acuerdo"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search Agreement Type..." />
                        <CommandEmpty>No se encontro un tipo de acuerdo</CommandEmpty>
                        <CommandGroup>
                          {agreementTypes.map((agreementType) => (
                            <CommandItem
                              value={agreementType.id}
                              key={agreementType.id}
                              onSelect={() => {
                                editPropertyForm.setValue(
                                  "agreement_type_id",
                                  agreementType.id,
                                );
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  agreementType.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {agreementType.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <FormField
              control={editPropertyForm.control}
              name="agent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Agente</FormLabel>
                  <FormControl>
                    <Input placeholder="agente" {...field} />
                  </FormControl>
                  <FormDescription>
                    Nombre del agente responsable de esta propiedad
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={editPropertyForm.control}
              name="zone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zona</FormLabel>
                  <FormControl>
                    <Input placeholder="zona" {...field} />
                  </FormControl>
                  <FormDescription>
                    Zona de la ciudad donde esta ubicada la propiedad
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={editPropertyForm.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ciudad</FormLabel>
                  <FormControl>
                    <Input placeholder="ciudad" {...field} />
                  </FormControl>
                  <FormDescription>
                    Ciudad donde se encuentra la propiedad
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={editPropertyForm.control}
              name="state"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Departamento</FormLabel>
                  <Popover modal={true}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value
                            ? states.find(
                                (state) => state.value === field.value,
                              )?.label
                            : "Selecciona un Depto."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Buscar Depto..." />
                        <CommandEmpty>No state found</CommandEmpty>
                        <CommandGroup>
                          {states.map((state) => (
                            <CommandItem
                              value={state.label}
                              key={state.value}
                              onSelect={() => {
                                editPropertyForm.setValue(
                                  "state",
                                  state.value,
                                );
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  state.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {state.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <FormField
              control={editPropertyForm.control}
              name="total_area"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Area Total</FormLabel>
                  <FormControl>
                    <Input placeholder="area total" {...field} />
                  </FormControl>
                  <FormDescription>
                    Area total de la propiedad en metros cuadrados
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={editPropertyForm.control}
              name="year_built"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Año de Construccion</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1902"
                      max="2025"
                      step="1"
                      placeholder="año"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Año en el que se contruyo la propiedad
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={editPropertyForm.control}
              name="floor_plan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Planos</FormLabel>
                  <FormControl>
                    <Input placeholder="planos" {...field} />
                  </FormControl>
                  <FormDescription>
                    Planos de los pisos de la propiedad
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={editPropertyForm.control}
              name="has_natural_gas"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Tiene gas natural?</FormLabel>
                    <FormDescription>
                      Cuenta la propiedad con gas natural?  
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={editPropertyForm.control}
              name="has_electricity"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Tiene electricidad?</FormLabel>
                    <FormDescription>
                      Cuenta la propiedad con acceso a la red electrica?
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={editPropertyForm.control}
              name="has_water"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Tiene agua?</FormLabel>
                    <FormDescription>
                      Cuenta la propiedad con acceso al agua?
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={editPropertyForm.control}
              name="sketchfab_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID de sketchfab</FormLabel>
                  <FormControl>
                    <Input placeholder="sketchfab_id" {...field} />
                  </FormControl>
                  <FormDescription>
                    Identificador de sketchfab
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Guardar</Button>
          </form>
        </Form>
      </main>
    </ScrollArea>
  );
}
