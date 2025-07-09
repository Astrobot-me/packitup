import React from "react";
import "../../../../styles/globals.css"
import Navbar from "@/components/NavBar";

export default function AuthLayout({children} : {children : React.ReactNode}) {
    return (
        <html>
            <body>
                <Navbar/>
                {children}
            </body>
        </html>
    )
    
}