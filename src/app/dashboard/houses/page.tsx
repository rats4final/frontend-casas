"use client"

import DataTable from "@/components/ui/data-table";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function HousesPage() {

  const housesQuery = useQuery({
    queryKey: ["houses"],
    queryFn: async () => {
      const response = await api().get('/api/houses')
      return response.data;
    },
  })

  console.log(housesQuery.error)

  return (
    <main>
      <section>
        <Button asChild>
          <Link href="/dashboard/houses/create">Agregar una Casa</Link>
        </Button>
      </section>
      <DataTable data={housesQuery?.data?.data ?? []} columns={columns}/>
    </main>
  )
}
