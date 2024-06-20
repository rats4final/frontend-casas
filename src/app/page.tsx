import ModeToggle from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between gap-8 p-10">
      <div className="flex w-full items-center justify-evenly">
        <Button asChild><Link href="/properties">Ver Propiedades</Link></Button>
        <ModeToggle/>
        <Button asChild><Link href="/auth/login">Login</Link></Button>
      </div>
      {/* TODO::fix this by using an image with a fixed size, so that you don't use h-screen */}
      <div className="flex gap-3 w-full flex-col items-center justify-center md:bg-hero bg-hero-mobile bg-cover grow h-screen">
        <p className="text-lg md:text-6xl">Descubre tu nuevo hogar</p>
        <p className="text-sm md:text-2xl">
          Ayudando a la gente a encontrar la casa de sus suenios desde1992
        </p>
        <div className="w-2/3 mt-6 flex flex-col md:flex-row items-center gap-2">
          <Input type="search" placeholder="Search..."/>
          <Button>Buscar</Button>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <p className="text-xl md:text-4xl">La Mayor Cantidad de Anuncios de Alquiler</p>
        <p className="text-center md:text-lg">¡Elija entre más de 1000 apartamentos, casas, condominios y más!</p>
        <div className="flex flex-wrap md:flex-nowrap">
          <div className="flex flex-col gap-4 flex-wrap items-start justify-center pl-16 pr-14 py-6 bg-slate-100 dark:bg-slate-700">
            <p>Rente mas Rapido!</p>
            <p>Explore propiedades de la más alta calidad, presente su solicitud en línea, firme su contrato de arrendamiento e incluso eche un vistazo en 3D.</p>
            <Link href={"#"}>Mas Informacion</Link>
          </div>
          <Image
            className="grow"
            src="/images/using-laptop.jpg"
            alt="stock image"
            width={500}
            height={300}
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-8 w-full md:flex-row">
        <div className="w-full h-40 border">Some Cart text</div>
        <div className="w-full h-40 border">Some Cart text</div>
        <div className="w-full h-40 border">Some Cart text</div>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div>Card images</div>
        <div>Card images</div>
        <div>Card images</div>
        <div>Card images</div>
        <div>Card images</div>
        <div>Card images</div>
        <div>Card images</div>
        <div>Card images</div>
      </div>
      <div className="flex gap-6 items-center justify-center w-full overflow-x-auto md:grid md:grid-cols-4">
        <div className="border">Card images</div>
        <div className="border">Card images</div>
        <div className="border">Card images</div>
        <div className="border">Card images</div>
        <div className="border">Card images</div>
        <div className="border">Card images</div>
        <div className="border">Card images</div>
        <div className="border">Card images</div>
      </div>
      {/* We need a hero page first */}
      <div className="fixed right-8 bottom-8 animate-bounce">Arrow</div>
    </main>
  );
}
