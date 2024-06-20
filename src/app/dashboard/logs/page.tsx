"use client";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function LogsPage() {
  const logsQuery = useQuery({
    queryKey: ["logs"],
    queryFn: async () => {
      const response = await api().get("/api/get-logs");
      return response?.data;
    },
  });

  console.log(logsQuery?.data?.data);

  if (logsQuery.isLoading) {
    return <div>Cargando</div>;
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre del Registro</TableHead>
            <TableHead>Tipo del Sujeto</TableHead>
            <TableHead>Evento</TableHead>
            <TableHead>ID del sujeto</TableHead>
            <TableHead>Tipo del Causante</TableHead>
            <TableHead>ID del causante</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logsQuery?.data?.data.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.log_name}</TableCell>
              <TableCell>{item.subject_type}</TableCell>
              <TableCell>{item.event}</TableCell>
              <TableCell>{item.subject_id}</TableCell>
              <TableCell>{item.causer_type}</TableCell>
              <TableCell>{item.causer_id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
