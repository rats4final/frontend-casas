import { AxiosResponse } from "axios";
import api from "./api";
import { TpropertyStatusSchemaForm } from "./formTypes";
import { TagreementTypeSchema, TpropertyStatusSchema } from "./definitions";

export async function fetchPropertyStatuses() {
  return await api().get("/api/property-statuses");
}

export async function createPropertyStatus(data: TpropertyStatusSchemaForm) {
  const response = await api().post("/api/property-statuses", data);
  return response.data.data;
}

export async function deletePropertyStatus(id: number) {
  const response = await api().delete(`/api/property-statuses/${id}`);
  return response.data.data;
}

export async function fetchAgreementTypes(){
  return await api().get("/api/agreement-types");
}

export async function createProperty(data){
  const response = await api().post("/api/properties", data)
  return response.data.data;
}