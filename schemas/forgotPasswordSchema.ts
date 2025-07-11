import {regex, z } from 'zod'; 

const forgotPassSchema = z.object({
    identifier: z.string()
    .toLowerCase()
    .trim(),
    
}).required() 

