import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Page() {
  return (
    <main className="flex flex-col gap-4 items-center min-h-screen w-screen">
      <div>
        <Sheet>
          <SheetTrigger asChild>
            <Button>Open</Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Are you absolutely sure?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 w-full">
        <div className="w-full h-20 border">Something</div>
        <div className="w-full h-20 border">Something</div>
        <div className="w-full h-20 border">Something</div>
        <div className="w-full h-20 border">Something</div>
        <div className="w-full h-20 md:col-span-2 border">Something</div>
      </div>
    </main>
  );
}
