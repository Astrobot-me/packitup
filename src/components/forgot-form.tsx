import { GalleryVerticalEnd, TimerReset } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ForgotForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6 sm:min-w-lg border-2 rounded p-5  bg-white", className)} {...props}>

      <form>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <TimerReset className="size-6" />
              </div>
              <span className="sr-only">PackituP.</span>
            </a>
            <h1 className="text-xl font-bold">Welcome to PackituP.</h1>
            <div className="text-center text-sm">
             Reset your password here!
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email or Username</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com or astrobot"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Recover your account
            </Button>
          </div>
         
          
        </div>
      </form>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
