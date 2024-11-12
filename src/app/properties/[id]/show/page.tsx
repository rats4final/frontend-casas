import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import ImageModal from "./ImageModal";
import Image from "next/image";
import Map from "./map";
import { SVGProps } from "react";
import EquirectangularViews from "./EquiViews";
import ContactForm from "./ContactForm";
import VideoSphere from "./VideoSphere";

export default async function Page({ params }: {params: {id: string}}) {
  const { id } = params;
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/properties/${id}`,
  );
  const { data: property } = response.data;

  return (
    <div className="mx-auto max-w-6xl p-8">
      <div className="flex flex-col space-y-8">
        <div className="overflow-hidden rounded-lg bg-white shadow-lg">
          <div className="relative">
            <Image
              src={property.thumbnail}
              width={600}
              height={288}
              alt="Property"
              className="h-72 w-full object-cover"
            />
            <Button className="absolute left-4 top-4" variant="secondary">
              <HeartIcon className="h-6 w-6" />
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-2 p-4">
            {property.images.map((image, index: number) => (
              <ImageModal
                key={index}
                src={image.original_url}
                alt={`Property image ${index + 1}`}
              />
            ))}
          </div>
          <div className="p-6">
            <h2 className="mb-2 text-2xl font-semibold">{property.title}</h2>
            <p className="mb-4 text-gray-600">
              {property.address}, {property.city}, {property.state}
            </p>
            <p className="mb-6 text-gray-800">{property.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-green-600">
                $US{property.price} (Bs{property.priceBs})
              </span>
              <Badge variant="secondary">{property.property_status}</Badge>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-xl font-semibold">
              Detalles de la propiedad
            </h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="font-medium">Area Total:</span>
                <span>{property.total_area} m<sup>2</sup></span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Año de Construccion:</span>
                <span>{property.year_built}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Cuenta con electricidad:</span>
                <CheckIcon className="h-6 w-6 text-green-500" />
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Cuenta con acceso al agua:</span>
                <XIcon className="h-6 w-6 text-red-500" />
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Cuenta con gas natural:</span>
                {property.has_natural_gas === true ? (
                  <CheckIcon className="h-6 w-6 text-green-500" />
                ) : (
                  <XIcon className="h-6 w-6 text-red-500" />
                )}
              </li>
            </ul>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-xl font-semibold">Ubicacion</h3>
            <p className="mb-4 text-gray-600">{property.zone}</p>
            <div className="aspect-w-16 aspect-h-9">
              <Map
                lat={parseFloat(property.latitude)}
                long={parseFloat(property.longitude)}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <EquirectangularViews/>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6">
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h2>Contactanos para obtener mas informacion</h2>
              <ContactForm property={property}/>
            </div>
        </div>
        <div className="grid grid-cols-1 gap-6">
            <div className="rounded-lg bg-white shadow-lg">
              {property.videos !== "" ? <VideoSphere src={property.videos}/> : null}
            </div>
        </div>
      </div>
    </div>
  );
}

function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function HeartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
