"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavBarComponent() {
  const path = usePathname();
  return (
    <header className="w-full h-16 px-20 flex justify-center items-center border-2 border-gray-200">
      <nav className="w-full flex items-center justify-between ">
        <Link href={"/"} className="font-bold text-lg">
          Company
        </Link>

        <ul className="flex gap-5">
          {menuItem.map((menu, index) => (
            <li key={index}>
              <Link
                className={`text-sm ${
                  path === menu.path ? "text-blue-600" : ""
                }`}
                href={menu.path}
              >
                {menu.item}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="flex gap-3 items-center justify-center">
          <li className="text-sm">Log in</li>
          <li className="h-9 w-[1px] rounded-full bg-blue-100"></li>
          <li>
            <button className="bg-blue-600 rounded-md py-2 px-3 text-white text-sm">
              Sign up
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

type Menu = {
  path: string;
  item: string;
};

const menuItem: Menu[] = [
  {
    path: "/",
    item: "Home",
  },
  {
    path: "/product",
    item: "Product",
  },
  {
    path: "/about",
    item: "About",
  },
];
