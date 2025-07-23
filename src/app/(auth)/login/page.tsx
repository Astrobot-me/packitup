"use client";

import { useForm } from "react-hook-form";
import { LoginForm } from "@/components/loginform"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { SignInSchema } from "../../../../schemas/signInSchema";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { signIn } from "next-auth/react"

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

    const response = await signIn('credentials', {
      redirect: false,
      identifier: data.identifier.toLowerCase(),
      password: data.password
    })


    // console.log("Result object ::",result);

    if (!response) {
    
      toast({
        title: 'Login Failed',
        description: 'Some Internal Error Occured, Please Try again later ! ',
        variant: 'destructive',
      });
    }

    if (response?.error) {
   
      if (response.error === 'CredentialsSignin') {
        toast({
          title: 'Login Failed',
          description: 'Incorrect username or password',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description: response.error,
          variant: 'destructive',
        });
      }
    }

    if (response && (response.url || response.ok)) {
      console.log("Signin:" , response)
      toast({
        title: "Sign In Successful!"
      })
      router.replace('/');
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
