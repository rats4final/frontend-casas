import FillerCard from "@/components/ui/filler-card";
import { Suspense } from "react";

export default function Page(){
    return (
        <Suspense fallback={<p>Loading</p>}>
            <FillerCard/>
        </Suspense>
    )
}