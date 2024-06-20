/**
 * v0 by Vercel.
 * @see https://v0.dev/t/1DsklqNh8Md
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {
  CarouselItem,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
  Carousel,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Map from "./map";
import axios from "axios";

export default async function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/properties/${id}`,
  );
  const { data: property } = response.data;

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12">
              <div className="grid gap-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {property.title}
                </h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="h-5 w-5 fill-primary" />
                    <StarIcon className="h-5 w-5 fill-primary" />
                    <StarIcon className="h-5 w-5 fill-primary" />
                    <StarIcon className="h-5 w-5 fill-primary" />
                    <StarIcon className="h-5 w-5 fill-muted stroke-muted-foreground" />
                  </div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    (124 reviews)
                  </span>
                </div>
                <div className="text-4xl font-bold">
                  {property.price} Bs
                </div>
              </div>
              <div className="grid gap-4">
                <Carousel className="w-full overflow-hidden rounded-xl">
                  <CarouselContent>
                    {property.images.map((image, index: number) => (
                      <CarouselItem key={index}>
                        <div className="flex items-center justify-center p-1">
                          <Image
                            src={image.original_url}
                            alt={image.name}
                            className="aspect-video rounded-md object-cover"
                            width={400}
                            height={225}
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/50 p-2 transition-colors hover:bg-white/75">
                    <ChevronLeftIcon className="h-6 w-6" />
                  </CarouselPrevious>
                  <CarouselNext className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/50 p-2 transition-colors hover:bg-white/75">
                    <ChevronRightIcon className="h-6 w-6" />
                  </CarouselNext>
                </Carousel>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8">
              <div className="grid gap-4">
                <h2 className="text-2xl font-bold tracking-tighter">
                  About the Property
                </h2>
                <div className="prose max-w-[800px] text-gray-500 dark:text-gray-400">
                  <p>{property.description}</p>
                </div>
              </div>
              <div className="grid gap-4">
                <h2 className="text-2xl font-bold tracking-tighter">
                  Location
                </h2>
                <div className="grid gap-2">
                  <div className="flex items-center gap-4">
                    <MapPinIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                    <div>
                      <div className="font-medium">{property.address}</div>
                      <div className="text-gray-500 dark:text-gray-400">
                        Situated on a private beach in the heart of Malibu, this
                        villa offers unparalleled privacy and seclusion.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <RulerIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                    <div>
                      <div className="font-medium">
                        10 minutes to Malibu Pier
                      </div>
                      <div className="text-gray-500 dark:text-gray-400">
                        Enjoy easy access to the vibrant Malibu Pier, where you
                        can find restaurants, shops, and local attractions.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <PlaneIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                    <div>
                      <div className="font-medium">
                        45 minutes to Los Angeles International Airport (LAX)
                      </div>
                      <div className="text-gray-500 dark:text-gray-400">
                        Conveniently located just 45 minutes from LAX, making it
                        easy to access the property.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid gap-4">
                <Map
                  long={parseFloat(property.longitude)}
                  lat={parseFloat(property.latitude)}
                />
              </div>
              <div className="grid gap-4">
                <h2 className="text-2xl font-bold tracking-tighter">
                  Property Specifications
                </h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  <div className="flex items-center gap-2">
                    <BedIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                    <div>
                      <div className="font-medium">5 Bedrooms</div>
                      <div className="text-gray-500 dark:text-gray-400">
                        Sleeps 10
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <BathIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                    <div>
                      <div className="font-medium">6 Bathrooms</div>
                      <div className="text-gray-500 dark:text-gray-400">
                        Ensuite
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <RulerIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                    <div>
                      <div className="font-medium">5,000 sq ft</div>
                      <div className="text-gray-500 dark:text-gray-400">
                        Living Area
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <SquareXIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                    <div>
                      <div className="font-medium">1 Acre</div>
                      <div className="text-gray-500 dark:text-gray-400">
                        Lot Size
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CarIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                    <div>
                      <div className="font-medium">3 Car Garage</div>
                      <div className="text-gray-500 dark:text-gray-400">
                        Parking
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClubIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                    <div>
                      <div className="font-medium">Private Pool</div>
                      <div className="text-gray-500 dark:text-gray-400">
                        Outdoor Amenities
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <BeanIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                    <div>
                      <div className="font-medium">Private Beach Access</div>
                      <div className="text-gray-500 dark:text-gray-400">
                        Outdoor Amenities
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid gap-4">
                <h2 className="text-2xl font-bold tracking-tighter">
                  Additional Information
                </h2>
                <div className="grid gap-2">
                  <div className="flex items-center gap-4">
                    <FileIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                    <div>
                      <div className="font-medium">Property Brochure</div>
                      <div className="text-gray-500 dark:text-gray-400">
                        Download the full property brochure for more details.
                      </div>
                      <Button className="mt-2" size="sm" variant="link">
                        Download
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <SquareIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                    <div>
                      <div className="font-medium">3D Virtual Tour</div>
                      <div className="text-gray-500 dark:text-gray-400">
                        Explore the property in 3D to get a better feel for the
                        layout and amenities.
                      </div>
                      <Button className="mt-2" size="sm" variant="link">
                        View Tour
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full bg-gray-100 p-6 dark:bg-gray-800 md:py-12">
        <div className="container grid max-w-7xl grid-cols-2 gap-8 text-sm sm:grid-cols-3 md:grid-cols-5">
          <div className="grid gap-1">
            <h3 className="font-semibold">Company</h3>
            <Link href="#">About Us</Link>
            <Link href="#">Our Team</Link>
            <Link href="#">Careers</Link>
            <Link href="#">News</Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Properties</h3>
            <Link href="#">Luxury Homes</Link>
            <Link href="#">Beach Villas</Link>
            <Link href="#">Mountain Retreats</Link>
            <Link href="#">City Apartments</Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Resources</h3>
            <Link href="#">Blog</Link>
            <Link href="#">Guides</Link>
            <Link href="#">FAQs</Link>
            <Link href="#">Contact</Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Legal</h3>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
            <Link href="#">Cookie Policy</Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Connect</h3>
            <Link href="#">Facebook</Link>
            <Link href="#">Twitter</Link>
            <Link href="#">Instagram</Link>
            <Link href="#">LinkedIn</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function BathIcon(props) {
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
      <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
      <line x1="10" x2="8" y1="5" y2="7" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <line x1="7" x2="7" y1="19" y2="21" />
      <line x1="17" x2="17" y1="19" y2="21" />
    </svg>
  );
}

function BeanIcon(props) {
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
      <path d="M10.165 6.598C9.954 7.478 9.64 8.36 9 9c-.64.64-1.521.954-2.402 1.165A6 6 0 0 0 8 22c7.732 0 14-6.268 14-14a6 6 0 0 0-11.835-1.402Z" />
      <path d="M5.341 10.62a4 4 0 1 0 5.279-5.28" />
    </svg>
  );
}

function BedIcon(props) {
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
      <path d="M2 4v16" />
      <path d="M2 8h18a2 2 0 0 1 2 2v10" />
      <path d="M2 17h20" />
      <path d="M6 8v9" />
    </svg>
  );
}

function CarIcon(props) {
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
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <path d="M9 17h6" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  );
}

function ChevronLeftIcon(props) {
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
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon(props) {
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
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function ClubIcon(props) {
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
      <path d="M17.28 9.05a5.5 5.5 0 1 0-10.56 0A5.5 5.5 0 1 0 12 17.66a5.5 5.5 0 1 0 5.28-8.6Z" />
      <path d="M12 17.66L12 22" />
    </svg>
  );
}

function FileIcon(props) {
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
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
}

function MapPinIcon(props) {
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
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PlaneIcon(props) {
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
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  );
}

function RulerIcon(props) {
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
      <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z" />
      <path d="m14.5 12.5 2-2" />
      <path d="m11.5 9.5 2-2" />
      <path d="m8.5 6.5 2-2" />
      <path d="m17.5 15.5 2-2" />
    </svg>
  );
}

function SquareIcon(props) {
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
      <rect width="18" height="18" x="3" y="3" rx="2" />
    </svg>
  );
}

function SquareXIcon(props) {
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
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  );
}

function StarIcon(props) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
