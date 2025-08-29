import { signIn } from "next-auth/react"
import { Button } from "./ui/button"
import { Github, Key } from "lucide-react"

export default function GithubFunction(){ 
    return (
        <form action={async ()=>{ 
            await signIn('google')

          }}>
            <Button className="w-full px-5 py-2">
              Sign In With Google
              <Key/>
            </Button>

        </form>
    )
}