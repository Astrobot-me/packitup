import useLocalStorage from "@/lib/accesslocals"
import { cookies } from "next/headers";
import { useEffect } from "react"


export default function AuthProvider({children } : { children : React.ReactNode}) { 
    
    const [islogged, setIsLogged] = useLocalStorage({
        key: "isLogged", 
        value: ""
    }); 

    useEffect(()=> {

        const refreshToken = async () => { 
            try {
                const res = await fetch("/api/refresh-access", { 
                    method: "POST"
                }) 
                const result = await res.json() 

                

            } catch (error) {
                
            }
        }
        
        if(islogged === "true"){ 

        }

    },[])

    return (
        {children}
    )
}