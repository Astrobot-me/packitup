import React from "react";
import "../../../styles/globals.css"
import { Toaster } from "@/components/ui/toaster";

export default function AuthLayout({children} : {children : React.ReactNode}) {
    return (
        <html>
            <body>
                <Toaster/>
                {children}
            </body>
        </html>
    )
    
}