import React from "react";
import "../../../styles/globals.css"

export default function AuthLayout({children} : {children : React.ReactNode}) {
    return (
        <html>
            <body>
                {children}
            </body>
        </html>
    )
    
}