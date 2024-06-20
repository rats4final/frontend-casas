import { deletePropertyStatus } from "@/lib/data";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type DeletePropertyStatusProps = {
  id:number
}

export default function DeletePropertyStatus({id}: DeletePropertyStatusProps) {
  const queryClient = useQueryClient();
  const propertyStatusesMutation = useMutation({
    mutationFn: deletePropertyStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["propertyStatuses"] });
    },
  });

  return (
    <button
      onClick={() => {
        propertyStatusesMutation.mutate(id)
      }}
    >
      Borrar
    </button>
  );
}
