import { createPropertyStatus, fetchPropertyStatuses } from "@/lib/data";
import {
  propertyStatusSchemaForm,
  TpropertyStatusSchemaForm,
} from "@/lib/formTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

export default function usePropertyStatuses() {
  const propertyStatusForm = useForm<TpropertyStatusSchemaForm>({
    resolver: zodResolver(propertyStatusSchemaForm),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const propertyStatusesQuery = useQuery({
    queryKey: ["propertyStatuses"],
    queryFn: fetchPropertyStatuses,
  });

  const queryClient = useQueryClient();

  const propertyStatusesMutation = useMutation({
    mutationFn: createPropertyStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["propertyStatuses"] });
    },
  });

  function onSubmit(data: TpropertyStatusSchemaForm) {
    console.log(data);
    propertyStatusesMutation.mutate(data);
    propertyStatusForm.reset();
  }

  return {
    propertyStatusForm,
    propertyStatusesQuery,
    queryClient,
    onSubmit,
  };
}
