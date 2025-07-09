"use client";
import { usePathname } from "next/navigation";
import React from "react";
import NavBarComponent from "./NavBarComponent";

export default function NavBarWrapper() {
  const path = usePathname();
  return path === "/dashboard" ? null : <NavBarComponent />;
}
