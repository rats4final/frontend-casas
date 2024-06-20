import { Suspense } from "react";
import HouseCards from "./HouseCards";

export default function HomesPage() {
  return (
    <main>
      <div>Showing all houses</div>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <HouseCards/>
        </Suspense>
      </div>
    </main>
  )
}
