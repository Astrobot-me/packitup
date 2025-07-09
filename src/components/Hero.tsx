import { ArrowRight, Clock, Star, Truck } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'

function Hero() {
  return (
    <section className='py-20 relative '>
        <div className='h-auto -z-10 absolute inset-0 bg-gradient-to-b from-green-400/30 to-emerald-400/30' />
        <div className='container mx-auto '>
            <div className='grid sm:grid-cols-2 items-center gap-12 px-16'>
                <div className='space-y-10'>
                    <div className='space-y-4'>
                        <h1 className='text-6xl font-bold'>
                            Declicious Food
                            <br />
                            <span className='text-green-600'>Delivered</span>
                            <br />
                            To Your Door
                        </h1>
                        <p className='text-muted-foreground text-sm max-w-md'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, vel ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.
                        </p>

                    </div>
                    <div className='flex gap-6'>
                        <Button className='hover:bg-green-600'>
                            Order Now 
                            <ArrowRight/>
                        </Button>
                        <Button size={'lg'} variant={'outline'} className=''>
                            View Menu 
                        </Button>
                    </div>
                    <div className='flex gap-8'>
                        <div className='flex items-center gap-2'>
                            <Clock className='text-green-600' />
                            <p className='text-sm font-medium'>Fast Deliveries</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Truck className='text-green-600' />
                            <p className='text-sm font-medium'>Free Delivery</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Star className='text-green-600 fill-current' />
                            <p className='text-sm font-medium'>4.9 Ratings</p>
                        </div>

                    </div>
                </div>
                <div className='relative'>
                    <div className='bg-green-600 aspect-square rounded-2xl p-5 shadow'>
                        
                        <img src="https://placehold.co/400x400" alt="" className='w-full rounded-md object-contain' />
                    </div>
                    <div className='absolute -bottom-6 -left-10'>
                            <div className='flex items-center gap-2 p-4 px-6 bg-white shadow-lg rounded'>
                                <div className='flex items-center justify-center rounded-full bg-green-300 p-2'>
                                    <Star size={25} className='fill-current text-green-500'/>
                                </div>
                                <div className=''>
                                    <p className='font-semibold'>4.8 rating</p>
                                    <p className='text-muted-foreground'>2,678 Ratings</p>
                                </div>

                            </div>
                        </div>
                </div>

            </div>
        </div>
    </section>
  )
}

export default Hero