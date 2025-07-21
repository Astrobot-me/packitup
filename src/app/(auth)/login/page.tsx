"use client";

import { useForm } from "react-hook-form";
import { LoginForm } from "@/components/loginform"
import { zodResolver } from "@hookform/resolvers/zod"
import {  z } from "zod";
import { SignInSchema } from "../../../../schemas/signInSchema";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { signIn } from "@/lib/auth"; 

export default function Page() {
  const router = useRouter();
  const { toast } = useToast();
 

  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      identifier: "",
      password: ""
    }
  }
  )

  const OnSubmit = async (data: z.input<typeof SignInSchema>): Promise<void> => {
 
   

    const result = {
      success: true, 
      message: "haha"
    }

    if (result.success) {
      toast({
        variant: "default",
        title: "Login Successful",
      })
      
      router.replace("/")
    } else {
      toast({
        variant: "destructive",
        title: " Login Failed",
        description: result.message
      })
    }

  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-gradient-to-br from-green-300 to-emerald-300">
      <div className="w-full max-w-sm shadow-lg">
        <LoginForm className="" {...{ register, errors, OnSubmit, handleSubmit }} />
      </div>
    </div>
  )
}
