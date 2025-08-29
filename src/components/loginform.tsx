import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import z from "zod"
import { SignInSchema } from "../../schemas/signInSchema"
import {  FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form"
import { signIn } from "next-auth/react"
import { Github } from "lucide-react"
import GithubFunction from "./GithubButton"


type SignInFormSchema = z.input<typeof SignInSchema>

type LoginFormProps= {
  className:string; 
  register:UseFormRegister<SignInFormSchema>;
  handleSubmit:UseFormHandleSubmit<SignInFormSchema>; 
  OnSubmit : (data: SignInFormSchema) => Promise<void>;
  errors : FieldErrors<SignInFormSchema>
}

export function LoginForm({
  className,
  register, 
  OnSubmit, 
  errors, 
  handleSubmit, 
  ...props
}: LoginFormProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(OnSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="identifier"
                  type="text"
                  placeholder="m@example.com"
                  required
                  {...register("identifier")}
                />
                {errors?.identifier?.message && <p className="mt-1 text-sm text-red-600">{errors?.identifier?.message}</p>}
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required {...register("password")} />
                {errors.password?.message && <p className="mt-1 text-sm text-red-600">{errors.password?.message}</p>}
              </div>
              <div className="flex flex-col gap-3   ">
                <Button type="submit" className="w-full" >
                  Login
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
          <hr className="min-w-lg text-neutral-400" />
          <GithubFunction />
        </CardContent>
      </Card>
    </div>
  )
}
