import "./../../styles/globals.css"

type Prop = {
    children: React.ReactNode
}
export default function RootLayout({ children }: Prop) {
    return (
        <html>
            <body>
                <main>
                    {children}
                </main>
            </body>
        </html>
    )
}