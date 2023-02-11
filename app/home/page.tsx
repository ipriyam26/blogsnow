
import React from 'react'
import { Inter } from '@next/font/google'
const inter = Inter({ subsets: ['latin'] })

function Home() {
  return (

    <div className={`my-20 bg-red-500 ${inter.className}  lg:mx-28 `}>
<div className="flex justify-between">
    <h3 className={` text-5xl font-semibold`} >Untitled Blog</h3>
    <p className='w-2/5 bg-yellow-50 text-lg text-slate-700 font-medium'>
        New product features, updates, and the latest tech news, delivered.
    </p>
</div>
<div>
    
</div>
    </div>

  )
}

export default Home