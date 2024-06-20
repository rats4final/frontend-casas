import { ScrollArea } from "@/components/ui/scroll-area";
import EditProperties from "./EditProperties";

export default function EditPropertyPage({ params }: { params: { id: string } }) {

  const {id} = params;

  return (
    <ScrollArea className="h-full">
      <EditProperties id={parseInt(id)}/>
    </ScrollArea>
  )
}
