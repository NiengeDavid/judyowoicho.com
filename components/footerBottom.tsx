"use client";

import { useState } from "react";
import Container from "./container";
import { menuList } from "@/data/menuList";

export default function FooterBottom() {
  const [currentPage, setCurrentPage] = useState("/");

  return (
    <div>
      <Container className="text-center py-8 mt-8 text-sm text-gray-600 space-y-4">
        <p className="text-black">
          © Judith Owiocho 2024–{new Date().getFullYear()}
        </p>
        <nav className="flex flex-wrap space-x-4 items-center justify-center leading-7 md:space-x-8 text-black">
          {menuList.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setCurrentPage(item.href)}
              className={`hover:text-secondary text-sm ${
                currentPage === item.href ? "text-secondary" : ""
              }`}
            >
              {item.name}
            </a>
          ))}
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
