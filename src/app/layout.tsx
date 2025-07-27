import { Toaster } from "@/components/ui/toaster"
import "./../../styles/globals.css"
import AuthProvider from "./providers/auth-provider"

type Prop = {
    children: React.ReactNode
}
export default function RootLayout({ children }: Prop) {
    return (
        <html>
            <body>
                <main>
                    <Toaster />
                    <AuthProvider>
                        {children}
                    </AuthProvider>
                </main>
            </body>
        </html>
    )
}