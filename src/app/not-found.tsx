import { Button } from '@/components/ui/button'
import { Ban, RefreshCcw, Reply, } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function NotFoundPage() {
  return (
    <div className='w-screen bg-green-800 space-y-4 text-white'>
       <div className='flex min-h-dvh justify-center items-center'>
          <div className='flex flex-col space-y-4'>
              <div className='space-x-2 flex items-center ml-2'>
                  <Ban size={30}/>
                  <h1 className='text-4xl'>404 Not found</h1>
              </div>
              <hr className='bg-gray-300 min-w-sm' />
              <div className=''>
                  Uhh ohh! The content you are looking for is not available

              </div>
              <Link href={"/"} replace className='flex justify-center'>
                <Button variant={'default'} className=''> Go Back{""} 
                  <Reply/>
                </Button>
              </Link>
          </div>
       </div>
    </div>
  )
}

export default NotFoundPage