"use client";

import { SignUpForm } from "@/components/signup-form";
import { SignUpFormSchema } from "../../../../schemas/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function Page() {

  const router = useRouter(); 
  const { toast } = useToast(); 
  const { register, handleSubmit, formState: { errors } } = useForm<z.input<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      firstname:"",
      lastname:"",
      email: "",
      username: "",
      password: "",
    },
  });

  const OnSubmit = async (data: z.input<typeof SignUpFormSchema>) => {
    const post = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const result = await post.json()

    if (result.success){ 
      toast({ 
          title: "Sign-In Successfull! Please Verify", 
          description: result.message
        }
      )

      router.push(`/verify-code/${data.username}`)
    }else{ 
       toast({ 
          variant:"destructive", 
          title: "Sign-In Failed Try Again!", 
          description: result.message
        }
      )
    }
    console.log("Result", result)
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-gradient-to-br from-green-300 to-emerald-300">
      <div className="w-full max-w-sm shadow-lg">
        <SignUpForm
          className=""
          {...{ register, errors, handleSubmit, OnSubmit }}
        />
      </div>
    </div>
  );
}
