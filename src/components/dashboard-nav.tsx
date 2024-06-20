"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types";
import { Dispatch, SetStateAction } from "react";

interface DashboardNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

export function DashboardNav({ items, setOpen }: DashboardNavProps) {
  const path = usePathname();
  const router = useRouter();

  if (!items?.length) {
    return null;
  }

  return (
    <div className="max-h-[calc(100vh-6rem)] overflow-y-auto">
      <nav className="grid items-start gap-2">
        {items.map((item, index) => {
          const Icon = Icons[item.icon || "arrowRight"];
          return item.isSection ? (
            <Section key={index} item={item} setOpen={setOpen} />
          ) : (
            item.href && (
              <Link
                key={index}
                href={item.disabled ? "/" : item.href}
                onClick={() => {
                  if (setOpen) setOpen(false);
                }}
              >
                <span
                  className={cn(
                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    path === item.href ? "bg-accent" : "transparent",
                    item.disabled && "cursor-not-allowed opacity-80",
                  )}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  <span>{item.title}</span>
                </span>
              </Link>
            )
          );
        })}
      </nav>
    </div>
  );
}

interface SectionProps {
  item: NavItem;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

const Section = ({ item, setOpen }: SectionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const path = usePathname();
  const handleToggleSection = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="space-y-1">
      <button
        className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
        onClick={handleToggleSection}
      >
        {item.title}
        <Icons.chevronDown
          className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")}
        />
      </button>
      {isOpen && (
        <div className="px-6">
          {item.children?.map((child, index) => (
            <Link
              key={index}
              href={child.disabled ? "/" : child.href || ""}
              onClick={() => {
                if (setOpen) setOpen(false);
              }}
            >
              <span
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  path === child.href ? "bg-accent" : "transparent",
                  child.disabled && "cursor-not-allowed opacity-80",
                )}
              >
                <Icons.arrowRight className="mr-2 h-4 w-4" />
                <span>{child.title}</span>
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
