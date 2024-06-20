"use client"

import api from "@/lib/api"
import { useQuery } from "@tanstack/react-query"
import FormEditProperty from "./FormEditProperty"

export default function EditProperties({id}: {id:number}) {

  const getSinglePropertyQuery = useQuery({
    queryKey: ["Properties", id],
    queryFn: async () => {
      const response = await api().get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/properties/${id}`)
      return response.data.data;
    }
  })

  if (getSinglePropertyQuery.isLoading || getSinglePropertyQuery.isPending) {
    return <div>Cargando...</div>
  }

  console.log(getSinglePropertyQuery.data);

  return (
    <FormEditProperty property={getSinglePropertyQuery.data}/>
  )
}
