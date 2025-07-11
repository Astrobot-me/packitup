import {regex, z } from 'zod'; 

export const SignInSchema = z.object({
    identifier: z.string()
    .trim(),
    password: z.string()
    .trim()
   
    
}).required() 


