import ModeToggle from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between gap-8 p-10">
      <div>
        <ModeToggle/>
      </div>
      {/* TODO::fix this by using an image with a fixed size, so that you don't use h-screen */}
      <div className="flex gap-3 w-full flex-col items-center justify-center md:bg-hero bg-hero-mobile bg-cover grow h-screen">
        <p className="text-lg md:text-6xl">Discover Your New Home</p>
        <p className="text-sm md:text-2xl">
          Helping people find homes since 1992
        </p>
        <div className="w-2/3 mt-6 flex flex-col md:flex-row items-center gap-2">
          <Input type="search" placeholder="Search..."/>
          <Button>Search</Button>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <p className="md:text-4xl">The Most Rental Listings</p>
        <p className="text-lg">Choose from over 1000 apartments, houses, condos, and more!</p>
        <div className="flex flex-wrap md:flex-nowrap">
          <div className="flex flex-col gap-4 flex-wrap items-start justify-center pl-16 pr-14 bg-slate-100">
            <p>Rent Faster!</p>
            <p>Browse the highest quality properties, apply online, sign your lease, and even take a 3D look!</p>
            <Link href={"#"}>Find Out More</Link>
          </div>
          <Image
            src="/images/using-laptop.jpg"
            alt="stock image"
            width={500}
            height={300}
          />
        </div>
      </div>
      {/* We need a hero page first */}
    </main>
  );
}
