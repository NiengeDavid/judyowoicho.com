"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import Container from "./container";
import { menuList } from "@/data/menuList";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-primary p-4">
      <Container>
        <div className="container mx-auto flex flex-col flex-wrap justify-between items-center gap-6 lg:gap-2 lg:flex-row">
          {/* Logo */}
          <Link href={"/"}>
            <h1 className="text-white font-mono text-3xl font-bold uppercase">
              Judith Owoicho
            </h1>
          </Link>

          {/* Menu List */}
          <ul className="flex flex-wrap space-x-4 items-center justify-center leading-7 md:space-x-8 text-white">
            {menuList.map((item) => (
              <li key={item.href}>
                {item.isExternal ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-secondary uppercase text-sm"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className={`hover:text-secondary uppercase text-sm ${
                      pathname === item.href ? "text-secondary" : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
            <li>
              <a
                href="https://www.linkedin.com/in/judithnguhemenowoicho"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-secondary"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/judyowoicho/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-secondary"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </nav>
  );
}
