"use client";
import Image from "next/image";

export default function Logo({ size = 48 }: { size?: number }) {
  return (
    <Image
      src="/img/logo-senzaSfondo.jpg"
      alt="Logo Trapani Volley"
      width={size}
      height={size}
      style={{ width: size, height: size, objectFit: "contain", borderRadius: "50%" }}
      priority
    />
  );
}