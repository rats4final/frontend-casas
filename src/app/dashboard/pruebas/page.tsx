import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PruebasPage() {
  return (
    <main className="p-4 grid grid-cols-2 gap-4">
      <Button asChild><Link href="/360-test">Prueba 360</Link></Button>
      <Button asChild><Link href="/calendar-test">Prueba Calendario</Link></Button>
      <Button asChild><Link href="/sketchfab-test">Prueba Sketchfab</Link></Button>
      <Button asChild><Link href="/three-test">Prueba Three.js</Link></Button>
      <Button asChild><Link href="/xr-test">Prueba XR</Link></Button>
      <Button asChild><Link href="/three360/first">Prueba 360 VR</Link></Button>
      <Button asChild><Link href="/three360/video">Prueba video 360</Link></Button>
      <Button asChild><Link href="/zapworks-test">Prueba Realidad Aumentada</Link></Button>
    </main>
  )
}
