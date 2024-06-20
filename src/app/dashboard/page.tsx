import SoldCountChart from "@/components/dashboard/sold-count-chart";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Page() {
  return (
    <ScrollArea className="h-full">
      <p>Bienvenido Usuario</p>
      <div className="border">
        <h1>Cantidad de propiedades vendidas por mes</h1>
        <SoldCountChart/>
      </div>
    </ScrollArea>
  )
}
