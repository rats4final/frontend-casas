"use client"

import { Button } from "@/components/ui/button";
import api from "@/lib/api"
import { toast } from "sonner";

export default function BackupsPage() {

  const handleClick = async () => {
    try {
      const response = await api().post('/api/execute-backup');
      toast.success("Respaldo realizado con exito");
      toast.success(`${response.data.message} | ${response.data.output}`);
    } catch (error) {
      toast.error('Ocurrio un error al ejecutar el respaldo')
    }
  }


  return (
    <div>
      <Button onClick={handleClick}>Ejecutar Respaldo</Button>
    </div>
  )
}
