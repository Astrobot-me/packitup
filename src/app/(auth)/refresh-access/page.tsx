"use client";

import useLocalStorage from "@/lib/accesslocals";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Loading() {
    const [isLogged, setIsLogged] = useLocalStorage({
        key: "isLogged",
        value: "",
    });

    const router = useRouter();

    useEffect(() => {
        const refreshToken = async () => {
            try {
                const res = await fetch("/api/refresh-access", {
                    method: "POST",
                });

                const result = await res.json();
                if (result.success) {
                    setIsLogged("true");
                } else {
                    setIsLogged(""); // Clear it if refresh fails
                    router.push("/login"); // Redirect to login if not authenticated
                }
            } catch (error) {
                console.error("Token refresh failed:", error);
                setIsLogged(""); // Fallback clear
                router.push("/login");
            }
        };

        if (isLogged === "true") { 
            refreshToken();
        }
    }, [isLogged]);

    return (
        <div className="flex items-center justify-center h-screen bg-black text-white">
            <div className="w-20 h-20 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
}
