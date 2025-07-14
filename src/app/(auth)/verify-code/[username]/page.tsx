"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";


const FormSchema = z.object({
    pin: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
})

export default function VerifyPage() {
    const [value, setValue] = useState("")
    const { username } = useParams();
    const {toast } = useToast(); 
    const router = useRouter()


    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pin: "",
        },
    })

    const onSubmit = async (data :z.input<typeof  FormSchema>) => {
        const response = await fetch(`/api/verify-user`, { 
            method:"POST", 
            body: JSON.stringify({ 
                otp:data.pin, 
                username
            })
        })

        const result = await response.json(); 

        if(result.success){ 
            toast({
                variant:"default", 
                title:"User Verification Successful"
            })
            router.push("/login")
        }else{ 
            toast({
                title:"Verification Failed",
                description:result.message
            })
        }
    }

    return (

        <div className="bg-gradient-to-br from-black/100 to-black/80 h-screen flex items-center ">
            <div className="container mx-auto px-6">
                <div className="flex justify-center">
                    <div className="bg-white p-5 rounded-lg max-w-md">
                        <div className="flex flex-col gap-8 items-center justify-center">
                            <h1 className="text-3xl">Verify otp for username <span className="text-blue-800 text-xl font-bold"> {username}</span></h1>
                            <div className="space-y-2 space-x-6 my-5 mb-10">
                                <Form {...form} >
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                                        <FormField
                                            control={form.control}
                                            name="pin"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>One-Time Password</FormLabel>
                                                    <FormControl>
                                                        <InputOTP maxLength={6} {...field}>
                                                            <InputOTPGroup>
                                                                <InputOTPSlot index={0} />
                                                                <InputOTPSlot index={1} />
                                                                <InputOTPSlot index={2} />
                                                                <InputOTPSlot index={3} />
                                                                <InputOTPSlot index={4} />
                                                                <InputOTPSlot index={5} />
                                                            </InputOTPGroup>
                                                        </InputOTP>
                                                    </FormControl>
                                                    <FormDescription>
                                                        Please enter the one-time password sent to your phone.
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit">Submit</Button>
                                    </form>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )

}