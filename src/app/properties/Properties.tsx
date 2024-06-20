import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

export type Property = {
  id: number;
  images: any[];
  documents: any[];
  models: any[];
  "360_views": any[];
  title: string;
  thumbnail: string;
  description: string;
  price: string;
  longitude: string;
  latitude: string;
  address: string;
  property_status: string;
  agreement_type: string;
  owners: any[];
  agent: any;
  zone: string;
  city: string;
  state: string;
  total_area: string;
  year_built: string;
  floor_plan: string;
  has_electricity: boolean;
  has_water: boolean;
  has_natural_gas: boolean;
  sketchfab_id: any;
  created_at: string;
  updated_at: string;
};

type PropertyData = {
  data: Property[];
};

export default async function Properties({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/properties?filter[search]=${query}&page=${currentPage}`
  );

  const { data: properties }: PropertyData = response.data;

  return (
    <>
      {properties.map((property) => (
        <CardContainer
          className="w-96 mx-auto mb-6"
          key={property.id}
        >
          <CardBody className="relative h-auto w-auto rounded-xl border border-gray-200 bg-white p-4 shadow-lg transition-shadow hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800 dark:hover:shadow-emerald-500/[0.1]">
            <CardItem
              translateZ="50"
              className="text-xl font-bold text-gray-800 dark:text-white"
            >
              {property.title}
            </CardItem>
            <CardItem translateZ="100" className="mt-4 w-full">
              <Image
                src={property.thumbnail}
                height="1000"
                width="1000"
                className="h-60 w-full rounded-xl object-cover transition-transform transform group-hover:scale-105"
                alt="thumbnail"
              />
            </CardItem>
            <CardItem translateZ="50" className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
              Bs {property.price}
            </CardItem>
            <CardItem translateZ="50" className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {property.address}, {property.city}, {property.state}
            </CardItem>
            <CardItem
              translateZ={20}
              as={Link}
              href={`/properties/${property.id}/show`}
              target="__blank"
              className="mt-4 inline-block rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
            >
              Ver Detalles
            </CardItem>
          </CardBody>
        </CardContainer>
      ))}
    </>
  );
}
