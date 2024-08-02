import { House } from "@/app/dashboard/houses/columns";
import api from "./api";

//export const fetchAllHouses = async () => (await api().get("/api/houses")).data;

export async function fetchAllHouses():Promise<House[]>  {
  const response = await api().get("/api/houses");
  return response.data;
}
