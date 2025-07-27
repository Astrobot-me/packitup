"use client"

import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, DivideIcon, ShoppingCart, SunMedium } from 'lucide-react';
import Link from 'next/link';
import { useSession, signOut } from "next-auth/react"
import { User } from 'next-auth';
import { DropdownMenu, DropdownMenuSeparator, DropdownMenuTrigger,DropdownMenuContent, DropdownMenuLabel } from './ui/dropdown-menu';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import Image from 'next/image';

export default function Navbar() {

    const { data, status, update } = useSession();
    const User: User = data?.user;

    return (
        <>
            <div className='flex h-16 justify-between items-center bg-black/95 backdrop-blur sticky top-0 z-10 text-white px-14  '>
                <Link href={'/'}>
                    <div className='flex items-center justify-center space-x-1'>
                        <img src="./food-fruit.png" alt="" className='w-10' />
                        <p className='text-md font-bold'>PacKitup</p>
                    </div>
                </Link>
                <div className='hidden md:flex'>
                    <ul className='list-none flex gap-6 font-medium cursor-pointer '>
                        <Link href='/menu'>
                            <li className='text-sm hover:text-green-500 transition-colors'>Menu</li>
                        </Link>
                    </ul>
                    {User && <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="h-9 w-9 cursor-pointer">
                                <img src={"https://placehold.co/40x40"} alt="@student" className='rounded-full' />
                                {/* <AvatarFallback>SD</AvatarFallback> */}
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Order History</DropdownMenuItem>
                            <DropdownMenuItem>Privacy & Policy</DropdownMenuItem>
                            <DropdownMenuItem>Terms & Condition</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {status === "authenticated" && 
                                <DropdownMenuItem onClick={()=> { 
                                    signOut()
                                }}>Logout</DropdownMenuItem>
                            }
                        </DropdownMenuContent>
                    </DropdownMenu>

                    }
                </div>



                <div className='flex items-center justify-around gap-2 '>
                    <Button variant={'secondary'} className='px-6 rounded-full bg-white/90 backdrop-blur-xl  '>
                        <SunMedium />
                    </Button>
                    {
                        User && <Button variant={'secondary'} className='px-6 rounded-full bg-white/90 backdrop-blur-xl  '>
                        <ShoppingCart />
                    </Button>
                    }
                    <Link href={"/login"}>
                        <Button variant={'default'} className='bg-green-600 w-16 rounded-full hover:bg-white hover:text-black'>
                        <ArrowRight size={10} />
                        </Button>
                    </Link>

                </div>
            </div >
        </>
    )

}