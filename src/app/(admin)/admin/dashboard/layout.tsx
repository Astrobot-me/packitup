"use client"

import React from "react";
import "../../../../../styles/globals.css"
import Navbar from "@/components/NavBar";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import Unauthenticated from "@/components/unauthenticated";
import LoadingSkeleton from "@/components/LoadingSkeleton";


export default function AdminLayout({ children }: { children: React.ReactNode }) {

    const { data, status } = useSession();
    const user: User = data?.user

    if(status === "loading" ) return <LoadingSkeleton/>
    if (user?.userrole !== "admin") return <Unauthenticated />

    return (
        <html>
            <body>
                    {children}
            </body>
        </html>
    )

}