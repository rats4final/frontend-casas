"use client"

import DataTable from "@/components/ui/data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import useHouses from "@/hooks/useHouses";
export default function HousesPage() {

 const housesQuery = useHouses();

  console.log(housesQuery.error)

  return (
    <main>
      <section>
        <Button asChild>
          <Link href="/dashboard/houses/create">Agregar una Casa</Link>
        </Button>
      </section>
      <DataTable data={housesQuery?.data ?? []} columns={columns}/>
    </main>
  )
}
