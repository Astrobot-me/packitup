import {regex, z } from 'zod'; 

export const SignUpFormSchema = z.object({
    firstname:z.string(), 
    lastname:z.string(), 
    username: z.string()
    .min(4,"username length must be 4 chars min")
    .toLowerCase()
    .trim(),
    email:z.email({
        pattern: z.regexes.email, // equivalent
        message:"Please Enter an valid email"
    })
    .toLowerCase()
    .trim(),
    password: z.string()
    .trim()
    .regex(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/, {error:"Password must have a number, a lowercase, a uppercase, and a special character and (8,16) chars"})
    
}).required() 


