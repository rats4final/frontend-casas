"use client"
import {ColumnDef} from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

export type Property = {
  id: integer;
  longitude: string
  latitude: string
  address: string
  created_at: string
  updated_at: string
}

//columns might have to be defined inside the page component to refetch the data
//on delete or on update, etc
export const columns: ColumnDef<Property>[] = [
  {
    accessorKey: "title",
    header: "Titulo",
  },
  {
    accessorKey: "address",
    header: "Direccion"
  },
  {
    accessorKey: "description",
    header: "Descripcion"
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const property = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(property.address)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/properties/${property.id}/edit`}>Editar</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },

]
