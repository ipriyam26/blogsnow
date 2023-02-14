

import React, { Children } from 'react'
import { Inter } from '@next/font/google'
import { Localnav } from './Localnav';
const inter = Inter({ subsets: ['latin'] })

function Subscribe() {
    return (<form action="#">
        <div className="items-center mx-auto mb-3 space-y-4 ax-w-screen-sm sm:flex sm:space-y-0">
            <div className="relative w-full border   border-gray-600 ">
                <label htmlFor="email" className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email address</label>
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                </div>
                <input className="block p-3 pl-10 w-full text-sm text-gray-900 bg-white rounded-xl border-gray-300 sm:rounded-none  focus:ring-primary-500 focus:border-primary-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter your email" type="email" id="email" required />
            </div>
            <div>
                <button type="submit" className="py-3 px-5 w-full text-sm font-medium text-center text-white rounded-xl border cursor-pointer bg-purple-500 border-primary-600 sm:rounded-none sm:rounded-r-3xl hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Subscribe</button>
            </div>
        </div>

    </form>);
}



function Home({
    children,
}: {
    children: React.ReactNode
}) {
    // const router = ();
    // get current route
    return (

        <div className={` ${inter.className}   flex flex-col items-center lg:items-stretch`}>
            <div className='py-16 lg:py-20 lg:px-28  w-screen flex flex-col items-center bg-gray-50 lg:items-stretch'>
                    <h2 className='text-purple-500 font-medium mb-6'>Blog</h2>
                <div className="flex  flex-col space-y-5 lg:space-y-0 lg:flex-row items-center lg:items-start justify-between">
                    <h3 className={` text-5xl lg:text-6xl font-semibold`} >Untitled Blog</h3>
                    <p className='lg:w-2/5  mx-5 lg:mx-0 text-lg text-gray-600 font-normal'>
                        New product features, updates, and the latest tech news, delivered.
                    </p>
                </div>
                <div>
                </div>
                <section className="lg:w-1/3 w-3/5 my-10 ">
                    <Subscribe></Subscribe>
                    <p className=' text-xs text-gray-600'>We care about your data in our <u>privacy policy</u>.</p>
                </section>
            </div>
<div className='px-2 sm:px-6 lg:px-8'>
            <Localnav></Localnav>
            {children}
</div>
        </div>

    )
}

export default Home