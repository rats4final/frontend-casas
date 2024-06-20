import { Suspense } from "react";
import Properties from "./Properties";
import Search from "./search";
import PaginationComponent from "./pagination";
import axios from "axios";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPagesResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/properties?filter[search]=${query}`,
  );
  const meta = totalPagesResponse.data.meta;

  return (
    <main className="flex min-h-screen flex-col gap-8 bg-gray-100 p-4">
      <div className="mb-4">
        <Search />
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        <Suspense fallback={<p>Loading...</p>}>
          <Properties query={query} currentPage={currentPage} />
        </Suspense>
      </div>
      <div className="mt-8">
        <PaginationComponent meta={meta} />
      </div>
    </main>
  );
}
