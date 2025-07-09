"use client";
import { usePathname } from "next/navigation";
import React from "react";
import FooterComponent from "./FooterComponent";

export default function FooterWrapper() {
  const path = usePathname();
  return path === "/dashboard" ? null : <FooterComponent />;
}
