import { fetchAgreementTypes } from "@/lib/data";
import { useQuery } from "@tanstack/react-query";


export default function useAgreementTypes() {


  const agreementTypesQuery = useQuery({
    queryKey: ["agreementTypes"],
    queryFn: fetchAgreementTypes,
  });

  return {
    agreementTypesQuery
  };
}
