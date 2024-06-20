"use client";

import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";

export default function ImageModal({ src, alt }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative group overflow-hidden rounded-md cursor-pointer">
          <Image width={300} height={300} src={src} alt={alt} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomInIcon className="w-6 h-6 text-white" />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <Image width={800} height={800} src={src} alt={alt} className="w-full h-full object-contain" />
      </DialogContent>
    </Dialog>
  );
}

function ZoomInIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <line x1="21" x2="16.65" y1="21" y2="16.65" />
      <line x1="11" x2="11" y1="8" y2="14" />
      <line x1="8" x2="14" y1="11" y2="11" />
    </svg>
  );
}
