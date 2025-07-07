import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, ShoppingCart, SunMedium } from 'lucide-react';


export default function Navbar(){

    return(
        <>
            <div className='flex h-16 justify-between items-center bg-black/95 backdrop-blur sticky top-0 text-white px-14  '>
                <div className='flex items-center justify-center space-x-1'>
                    <img src="./food-fruit.png" alt="" className='w-10' />
                    <p className='text-md font-bold'>PacKitup</p>
                </div>
                <ul className='list-none flex gap-6 font-medium cursor-pointer '>
                    <li className='text-sm hover:text-green-500 transition-colors'>Menu</li>
                    <li className='text-sm hover:text-green-500 transition-colors'>Order</li>
                    <li className='text-sm hover:text-green-500 transition-colors'>Contact us</li>
                </ul>               
            
                <div className='flex items-center justify-around gap-2 '>
                    <Button variant={'secondary'} className='px-6 rounded-full bg-white/90 backdrop-blur-xl  '>
                        <SunMedium/>
                    </Button>
                    <Button variant={'secondary'} className='px-6 rounded-full bg-white/90 backdrop-blur-xl  '>
                        <ShoppingCart/>
                    </Button>
                    <Button variant={'default'} className='bg-green-600 w-16 rounded-full hover:bg-white hover:text-black'>
                        <ArrowRight size={10}/>
                    </Button>
                    
                </div>
            </div>
        </>
    )

}