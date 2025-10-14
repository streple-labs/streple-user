"use client";

import { nav_items } from "@/assets/nav-items";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <header className="lg:hidden fixed bottom-0 inset-x-0 h-[72px] border-t border-t-white/10 bg-[#211F22] z-50 px-[18px] sm:px-6 py-4">
      <nav className="w-full flex items-center justify-between gap-2">
        {nav_items.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center gap-2.5 sm:text-sm md:text-base ${
              pathname === item.href ? "text-[#A082F9]" : "text-white/50"
            }`}
          >
            <item.icon
              className={`${
                pathname === item.href ? "fill-[#A082F9]" : "fill-white/50"
              }`}
            />
            <p className="text-[10px] xs:text-xs">{item.name}</p>
          </Link>
        ))}
      </nav>
    </header>
  );
}
