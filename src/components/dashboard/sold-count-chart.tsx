"use client";

import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

type SoldProperties = {
  year: number;
  month: number;
  count: number;
};

export default function SoldCountChart() {
  const soldPropertiesQuery = useQuery({
    queryKey: ["SoldProperties"],
    queryFn: async (): Promise<SoldProperties[]> => {
      const response = await api().get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/properties-sold-by-month`,
      );
      return response.data;
    },
  });

  if (soldPropertiesQuery.isLoading || soldPropertiesQuery.isPending) {
    return <div>Cargando...</div>;
  }

  const formattedData = soldPropertiesQuery.data!.map((item) => ({
    nombre: `${item.year}-${item.month}`,
    cantidad: item.count,
  }));

  return (
    <LineChart
      width={500}
      height={300}
      data={formattedData}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="nombre" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="cantidad"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
}
