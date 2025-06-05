"use client";

import Container from "./container";
import { menuList } from "@/data/menuList";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FooterBottom() {
  const pathname = usePathname();

  return (
    <div>
      <Container className="text-center py-8 mt-8 text-sm text-gray-600 space-y-4">
        <p className="text-black">
          © Judith Owiocho 2024–{new Date().getFullYear()}
        </p>
        <nav className="w-full">
          <ul className="flex flex-wrap space-x-4 items-center justify-center leading-7 md:space-x-8 text-black">
            {menuList.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`hover:text-secondary uppercase text-sm ${
                    pathname === item.href ? "text-secondary" : ""
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-black/60 mx-auto px-4 mt-12">
          Design and Development by{" "}
          <a
            href="https://davidnienge.com.ng"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            David Nienge
          </a>
        </p>
      </Container>
    </div>
  );
}
