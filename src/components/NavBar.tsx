import React from 'react';
import { Button } from './ui/button';
import { ArrowRight,  ShoppingCart, SunMedium } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {

    return (
        <>
            <div className='flex h-16 justify-between items-center bg-black/95 backdrop-blur sticky top-0 z-10 text-white px-14  '>
                <Link href={'/'}>
                    <div className='flex items-center justify-center space-x-1'>
                        <img src="./food-fruit.png" alt="" className='w-10' />
                        <p className='text-md font-bold'>PacKitup</p>
                    </div>
                </Link>
                <ul className='list-none flex gap-6 font-medium cursor-pointer '>
                    <Link href='/menu'>
                        <li className='text-sm hover:text-green-500 transition-colors'>Menu</li> 
                    </Link>
                    <Link href='/'>
                        <li className='text-sm hover:text-green-500 transition-colors'>Order</li> 
                    </Link>
                    <Link href='/admin/dashboard' >
                        <li className='text-sm hover:text-green-500 transition-colors'>Admin</li>  
                    </Link>
                    <Link href='/users/testuser' >
                        <li className='text-sm hover:text-green-500 transition-colors'>User</li>  
                    </Link>
            </ul>

            <div className='flex items-center justify-around gap-2 '>
                <Button variant={'secondary'} className='px-6 rounded-full bg-white/90 backdrop-blur-xl  '>
                    <SunMedium />
                </Button>
                <Button variant={'secondary'} className='px-6 rounded-full bg-white/90 backdrop-blur-xl  '>
                    <ShoppingCart />
                </Button>
                <Button variant={'default'} className='bg-green-600 w-16 rounded-full hover:bg-white hover:text-black'>
                    <ArrowRight size={10} />
                </Button>

            </div>
        </div >
        </>
    )

}