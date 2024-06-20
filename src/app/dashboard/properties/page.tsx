"use client";
import api from "@/lib/api";
import { useEffect, useState } from "react";
import DataTable from "../../../components/ui/data-table";
import { Property, columns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  const propertiesQuery = useQuery({
    queryKey: ["properties"],
    queryFn: async () => await api().get("/api/propertiesAll"),
  });

  if (propertiesQuery.isLoading) return <h1>Cargando</h1>;

  return (
    <ScrollArea className="h-full p-4">
      {/* hacky pb-4 solution for now */}
      <section className="pb-4 flex items-center gap-4 justify-end">
        <Button asChild>
          <Link href="/dashboard/properties/property-statuses">Estados de Propiedad</Link>
        </Button>
        <Button asChild>
          <Link href="/dashboard/properties/create">Crear Propiedad</Link>
        </Button>
      </section>
      <DataTable columns={columns} data={propertiesQuery.data?.data.data} />
    </ScrollArea>
  );
}
