"use client";

import useLocalStorage from "@/lib/accesslocals";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthProvider({ children }: { children: React.ReactNode }) {


  return <>{children}</>;
}
