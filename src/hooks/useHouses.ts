import { fetchAllHouses } from "@/lib/clientData";
import { useQuery } from "@tanstack/react-query";

/**
 * Este hook devuelve todas las casas
 */
export default function useHouses(){
  return useQuery({
    queryKey: ["houses"],
    queryFn: fetchAllHouses,
  })
}